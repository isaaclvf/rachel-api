const { Book } = require("../models/book.model");

async function getAllBooks(page, limit) {
  return await Book.find();
}

async function createBook({ title, author, edition, ispn, status }) {
  const newBook = new Book({ title, author, edition, ispn, status });
  return await newBook.save();
}

async function updateBook({id, updatesDados}){
  const Books = await Book.findByIdAndUpdate({_id: id}, updatesDados, {new: true});
  if(!Books){
    throw new Error('Livro não encontrado');
  }
  return Books;
}

module.exports = {
  getAllBooks,
  createBook,
  updateBook,
};
