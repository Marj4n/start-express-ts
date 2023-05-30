import http from "http"
import bodyParser from "body-parser"
import dotenv from "dotenv"
import express, { Router } from "express"
import mongoose from "mongoose"

import router from "./router"
import compression from "compression"
import cookieParser from "cookie-parser"
import cors from "cors"

dotenv.config()

const app = express()
const server = http.createServer(app)
const port = process.env.PORT || 8080
export const secret = process.env.SECRET

app.use(cors({ credentials: true }))
app.use(compression())
app.use(cookieParser())
app.use(bodyParser.json())

mongoose.Promise = Promise
mongoose.connect(process.env.MONGODB_URI)
mongoose.connection.on("error", (error) => {
  console.error(error)
  console.log("MongoDB connection error. Please make sure MongoDB is running.")
  process.exit(1)
})
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB database successfully!")
})

app.use(
  "/",
  Router().get("/", (req, res) =>
    res.json({ message: "Nothing to see here! go to /api" })
  )
)

app.use("/api", router())

server.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`)
})
