import { Book, CreateBook } from "../protocols/book";
import { CreateReview } from "../protocols/review";

import prisma from "../database";

export async function getBooks() {
  const result = await prisma.books.findMany();
  return result;
}

export async function getBook(id: number) {
  const book = await prisma.books.findUnique({
    where: { id }
  });
  return book;
}

export async function createBook(book: CreateBook) {
  const { title, author, publisher, purchaseDate } = book;
  const result = await prisma.books.create({
    data: {
      title,
      author,
      publisher,
      purchaseDate: new Date(purchaseDate)
    }
  });
  return result;
}

export async function reviewBook(bookReview: CreateReview) {
  const { bookId, grade, review } = bookReview;
  const result = prisma.books.update({
    data: {
      grade,
      review
    },
    where: {
      id: bookId
    }
  });
  return result;
}