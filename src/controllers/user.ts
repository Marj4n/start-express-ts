import { Request, Response } from "express"

import { deleteUserById, getUserById, getUsers } from "../db/users"

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await getUsers()

    return res.status(200).json(users)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: `Something went wrong, ${error}` })
  }
}

export const getUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const user = await getUserById(id)

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    return res.status(200).json(user)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: `Something went wrong, ${error}` })
  }
}

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { username } = req.body

    if (!username) {
      return res.status(400).json({ message: "Username is required" })
    }

    const user = await getUserById(id)

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    user.username = username
    await user.save()

    return res.status(200).json({ message: "User updated successfully", user })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: `Something went wrong, ${error}` })
  }
}

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const user = await getUserById(id)

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    const deletedUser = await deleteUserById(id)

    return res
      .status(200)
      .json({ message: "User deleted successfully", user: deletedUser })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: `Something went wrong, ${error}` })
  }
}
