import { Document } from "mongoose"

export interface Book extends Document {
  _id: string
  title: string
  author: string
  description: string
  publicationYear: number
  userId: string
  createdAt: Date
  updatedAt: Date
}
