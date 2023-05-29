import {
  createBook,
  deleteBookById,
  getBookById,
  getBooks,
  updateBookById,
} from "@/db/books"
import { Book } from "@/types/book"
import { Request, Response } from "express"
import { get } from "lodash"

export const index = async (req: Request, res: Response) => {
  try {
    const books = await getBooks()

    if (books.length === 0) {
      return res.status(404).json({ message: "No books found" })
    }

    return res.status(200).json(books)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: `Something went wrong, ${error}` })
  }
}

export const show = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const book = await getBookById(id)

    if (!book) {
      return res.status(404).json({ message: "Book not found" })
    }

    return res.status(200).json(book)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: `Something went wrong, ${error}` })
  }
}

export const create = async (req: Request, res: Response) => {
  try {
    const { title, author, description, publicationYear }: Book = req.body

    if (!title || !author || !description || !publicationYear) {
      return res.status(400).json({
        message: "Missing required fields",
        required: "title, author, description, publicationYear",
      })
    }

    const userId = get(req, "identity.user._id") as string

    const book = await createBook({
      title,
      author,
      description,
      publicationYear,
      userId,
    })

    return res
      .status(201)
      .json({ message: "Book created successfully", data: book })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: `Something went wrong, ${error}` })
  }
}

export const update = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { title, author, description, publicationYear }: Book = req.body
    const book = await getBookById(id)
    const userId = get(req, "identity.user._id") as string

    if (!title || !author || !description || !publicationYear) {
      return res.status(400).json({
        message: "Missing required fields",
        required: "title, author, description, publicationYear",
      })
    }

    if (!book) {
      return res.status(404).json({ message: "Book not found" })
    }

    if (userId !== book.userId) {
      return res.status(403).json({ message: "Unauthorized" })
    }

    const updatedBook = await updateBookById(id, {
      title,
      author,
      description,
      publicationYear,
      updatedAt: new Date(),
    })

    return res
      .status(200)
      .json({ message: "Book updated successfully", data: updatedBook })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: `Something went wrong, ${error}` })
  }
}

export const destroy = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const book = await getBookById(id)
    const userId = get(req, "identity.user._id") as string

    if (!book) {
      return res.status(404).json({ message: "Book not found" })
    }

    if (userId !== book.userId) {
      return res.status(403).json({ message: "Unauthorized" })
    }

    const deletedBook = await deleteBookById(id)

    return res
      .status(200)
      .json({ message: "Book deleted successfully", data: deletedBook })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: `Something went wrong, ${error}` })
  }
}
