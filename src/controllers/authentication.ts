import { Request, Response } from "express"

import { createUser, getUserByEmail } from "../db/users"
import { hash, random } from "../helpers"

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, username } = req.body

    if (!email || !password || !username) {
      return res.status(400).json({
        message: "Missing required fields",
        required: "email, password, username",
      })
    }

    const existingUser = await getUserByEmail(email)

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" })
    }

    const salt = await random()
    const hashedPassword = hash(password, salt)
    const user = await createUser({
      email,
      username,
      authentication: {
        salt,
        password: hashedPassword,
      },
    })

    return res
      .status(201)
      .json({ message: "User created successfully", data: user })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: `Something went wrong, ${error}` })
  }
}

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({
        message: "Missing required fields",
        required: "email, password",
      })
    }

    const user = await getUserByEmail(email)

    if (!user) {
      return res.status(401).json({ message: "Email is incorrect" })
    }

    const expectedHash = hash(password, user.authentication.salt)

    if (expectedHash !== user.authentication.password) {
      return res.status(401).json({ message: "Password is incorrect" })
    }

    const salt = await random()
    user.authentication.sessionToken = hash(user._id.toString(), salt)

    await user.save()

    res.cookie("API_AUTH", user.authentication.sessionToken, {
      expires: new Date(Date.now() + 12 * 60 * 60 * 1000),
    })

    return res.status(200).json({ message: "Login successful", data: user })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: `Something went wrong, ${error}` })
  }
}

export const logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie("API_AUTH") // Clear the session cookie

    return res.status(200).json({ message: "Logout successful" })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: `Something went wrong, ${error}` })
  }
}
