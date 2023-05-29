import { Book } from "@/types/book"
import { Document, Model, Schema, model } from "mongoose"

const bookSchema: Schema<Book> = new Schema<Book>({
  _id: { type: String, required: true },
  title: { type: String, required: true },
  author: { type: String, required: true },
  description: { type: String, required: true },
  publicationYear: { type: Number, required: true },
  userId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

export const BookModel: Model<Book> = model<Book>("Book", bookSchema)

export const getBooks = (): Promise<Book[]> => BookModel.find()

export const getBookById = (id: string): Promise<Book | null> =>
  BookModel.findById(id)

export const createBook = async (values: Partial<Book>): Promise<Book> => {
  const bookCount = await BookModel.countDocuments({})
  const newBook = new BookModel({ _id: String(bookCount + 1), ...values })
  return newBook.save().then((book) => book.toObject())
}

export const updateBookById = (
  id: string,
  book: Partial<Book>
): Promise<Book | null> => BookModel.findByIdAndUpdate(id, book, { new: true })

export const deleteBookById = (id: string): Promise<void> =>
  BookModel.findByIdAndDelete(id)
