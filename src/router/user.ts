import {
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from "../controllers/user"
import { isAuthenticated, isOwner } from "../middlewares"
import { Router } from "express"

export default (router: Router) => {
  router.get("/users", isAuthenticated, getAllUsers)
  router.get("/users/:id", isAuthenticated, getUser)
  router.patch("/users/:id", isAuthenticated, isOwner, updateUser)
  router.delete("/users/:id", isAuthenticated, isOwner, deleteUser)
}
