import { getUserBySessionToken } from "@/db/users"
import { NextFunction, Request, Response } from "express"
import { get, merge } from "lodash"

export const isOwner = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params
    const currentUserId = get(req, "identity.user._id") as string

    if (!currentUserId) {
      return res.status(403).json({ message: "Unauthorized" })
    }

    if (currentUserId.toString() !== id) {
      return res.status(403).json({ message: "Unauthorized" })
    }

    next()
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: `Something went wrong, ${error}` })
  }
}

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const sessionToken = req.cookies["API_AUTH"]

    if (!sessionToken) {
      return res.status(403).json({ message: "Unauthorized" })
    }

    const user = await getUserBySessionToken(sessionToken)

    if (!user) {
      return res.status(403).json({ message: "Unauthorized" })
    }

    merge(req, { identity: { user } })

    return next()
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: `Something went wrong, ${error}` })
  }
}
