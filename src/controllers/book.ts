import { Request, Response } from "express"
import { get } from "lodash"

import {
  createBook,
  deleteBookById,
  getBookById,
  getBooks,
  updateBookById,
} from "../db/books"
import { foRes } from "../helpers"
import { Book } from "../types/book"

export const index = async (req: Request, res: Response) => {
  try {
    const books = await getBooks()

    if (books.length === 0) {
      return res.status(404).json(foRes(404, "Books not found"))
    }

    return res.status(200).json(foRes(200, "Books found", books))
  } catch (error) {
    console.log(error)
    return res.status(500).json(foRes(500, `Something went wrong, ${error}`))
  }
}

export const show = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const book = await getBookById(id)

    if (!book) {
      return res.status(404).json(foRes(404, "Book not found"))
    }

    return res.status(200).json(foRes(200, "Book found", book))
  } catch (error) {
    console.log(error)
    return res.status(500).json(foRes(500, `Something went wrong, ${error}`))
  }
}

export const create = async (req: Request, res: Response) => {
  try {
    const { title, author, description, publicationYear }: Book = req.body

    if (!title || !author || !description || !publicationYear) {
      return res.status(400).json(
        foRes(400, "Missing required fields", {
          required: "title, author, description, publicationYear",
        })
      )
    }

    const userId = get(req, "identity.user._id") as string

    const book = await createBook({
      title,
      author,
      description,
      publicationYear,
      userId,
    })

    return res.status(201).json(foRes(201, "Book created successfully", book))
  } catch (error) {
    console.log(error)
    return res.status(500).json(foRes(500, `Something went wrong, ${error}`))
  }
}

export const update = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { title, author, description, publicationYear }: Book = req.body
    const book = await getBookById(id)
    const userId = get(req, "identity.user._id") as string

    if (!title || !author || !description || !publicationYear) {
      return res.status(400).json(
        foRes(400, "Missing required fields", {
          required: "title, author, description, publicationYear",
        })
      )
    }

    if (!book) {
      return res.status(404).json(foRes(404, "Book not found"))
    }

    if (userId !== book.userId) {
      return res.status(403).json(foRes(403, "Unauthorized"))
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
      .json(foRes(200, "Book updated successfully", updatedBook))
  } catch (error) {
    console.log(error)
    return res.status(500).json(foRes(500, `Something went wrong, ${error}`))
  }
}

export const destroy = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const book = await getBookById(id)
    const userId = get(req, "identity.user._id") as string

    if (!book) {
      return res.status(404).json(foRes(404, "Book not found"))
    }

    if (userId !== book.userId) {
      return res.status(403).json(foRes(403, "Unauthorized"))
    }

    const deletedBook = await deleteBookById(id)

    return res
      .status(200)
      .json(foRes(200, "Book deleted successfully", deletedBook))
  } catch (error) {
    console.log(error)
    return res.status(500).json(foRes(500, `Something went wrong, ${error}`))
  }
}
