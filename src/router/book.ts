import { create, destroy, index, show, update } from "@/controllers/book"
import { isAuthenticated } from "@/middlewares"
import { Router } from "express"

export default (router: Router) => {
  router.get("/books", index)
  router.post("/books", isAuthenticated, create)
  router.get("/books/:id", show)
  router.patch("/books/:id", isAuthenticated, update)
  router.delete("/books/:id", isAuthenticated, destroy)
}
