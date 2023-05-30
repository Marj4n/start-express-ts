import { Router } from "express"

import authentication from "./authentication"
import book from "./book"
import user from "./user"

const router = Router()

export default (): Router => {
  router.get("/", (req, res) => {
    res.json({
      message: "Go to /books or /users",
      docs: "https://github.com/Marj4n/start-express-ts#api-documentation",
    })
  })
  authentication(router)
  user(router)
  book(router)

  return router
}
