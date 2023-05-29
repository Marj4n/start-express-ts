import { Document } from "mongoose"

export interface User extends Document {
  _id: string
  username: string
  email: string
  authentication: {
    password: string
    salt: string
    sessionToken?: string
  }
}
