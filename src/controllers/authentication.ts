import { Request, Response } from "express"

import { createUser, getUserByEmail } from "../db/users"
import { foRes, hash, random } from "../helpers"

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, username } = req.body

    if (!email || !password || !username) {
      return res.status(400).json(
        foRes(400, "Missing required fields", {
          required: "email, password, username",
        })
      )
    }

    const existingUser = await getUserByEmail(email)

    if (existingUser) {
      return res.status(400).json(foRes(400, "Email already in use"))
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

    return res.status(201).json(foRes(201, "User created successfully", user))
  } catch (error) {
    console.log(error)
    return res.status(500).json(foRes(500, `Something went wrong, ${error}`))
  }
}

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res
        .status(400)
        .json(
          foRes(400, "Missing required fields", { required: "email, password" })
        )
    }

    const user = await getUserByEmail(email)

    if (!user) {
      return res.status(401).json(foRes(401, "Email is incorrect"))
    }

    const expectedHash = hash(password, user.authentication.salt)

    if (expectedHash !== user.authentication.password) {
      return res.status(401).json(foRes(401, "Password is incorrect"))
    }

    const salt = await random()
    user.authentication.sessionToken = hash(user._id.toString(), salt)

    await user.save()

    res.cookie("API_AUTH", user.authentication.sessionToken, {
      expires: new Date(Date.now() + 12 * 60 * 60 * 1000),
    })

    return res.status(200).json(foRes(200, "Login successful", user))
  } catch (error) {
    console.log(error)
    return res.status(500).json(foRes(500, `Something went wrong, ${error}`))
  }
}

export const logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie("API_AUTH") // Clear the session cookie

    return res.status(200).json(foRes(200, "Logout successful"))
  } catch (error) {
    console.log(error)
    return res.status(500).json(foRes(500, `Something went wrong, ${error}`))
  }
}
