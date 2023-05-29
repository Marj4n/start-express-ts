import { Router } from "express"

import authentication from "./authentication"
import book from "./book"
import user from "./user"

const router = Router()

export default (): Router => {
  authentication(router)
  user(router)
  book(router)

  return router
}
