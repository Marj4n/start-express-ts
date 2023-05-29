import crypto from "crypto"
import { secret } from "../server"

export const random = () => crypto.randomBytes(128).toString("base64")
export const hash = (value: string, salt: string) => {
  return crypto
    .createHmac("sha256", [salt, value].join("/"))
    .update(secret)
    .digest("hex")
}
