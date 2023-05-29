import { User } from "../types/user"
import mongoose, { Model, Schema } from "mongoose"

const userSchema: Schema<User> = new mongoose.Schema({
  _id: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  authentication: {
    password: { type: String, required: true, select: false },
    salt: { type: String, select: false },
    sessionToken: { type: String, select: false },
  },
})

export const UserModel: Model<User> = mongoose.model<User>("User", userSchema)

export const getUsers = (): Promise<User[]> => UserModel.find()
export const getUserByEmail = async (email: string): Promise<User | null> => {
  const user = await UserModel.findOne({ email }).select(
    "+authentication.salt +authentication.password"
  )
  return user
}

export const getUserBySessionToken = (
  sessionToken: string
): Promise<User | null> =>
  UserModel.findOne({ "authentication.sessionToken": sessionToken })

export const getUserById = (id: string): Promise<User | null> =>
  UserModel.findById(id)

export const createUser = async (values: Partial<User>): Promise<User> => {
  const { _id, ...rest } = values
  const userCount = await UserModel.countDocuments({})
  const user = new UserModel({ _id: String(userCount + 1), ...rest })
  return user.save().then((user) => user.toObject())
}

export const deleteUserById = (id: string): Promise<void> =>
  UserModel.findByIdAndDelete(id)

export const updateUserById = (
  id: string,
  values: Partial<User>
): Promise<User | null> =>
  UserModel.findByIdAndUpdate(id, values, { new: true })
