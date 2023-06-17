import crypto from "crypto"

import { secret } from "../server"

export const random = () => crypto.randomBytes(128).toString("base64")

export const hash = (value: string, salt: string) => {
  return crypto
    .createHmac("sha256", [salt, value].join("/"))
    .update(secret)
    .digest("hex")
}

// Response formater that can return a response with a status code, a message and some data
export const foRes = (code: number, message: string, data?: any) => {
  return {
    code,
    message,
    data,
  }
}
