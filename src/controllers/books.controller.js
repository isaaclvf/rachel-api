const { Router } = require("express");
const booksService = require("../services/books.service");
const booksRouter = Router();

booksRouter.get("/", async (req, res) => {
  try {
    const books = await booksService.getAllBooks();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

booksRouter.post("/", async (req, res) => {
  try {
    const { title, author } = req.body;
    const newBook = await booksService.createBook({ title, author });
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

booksRouter.put("/:id", async(req, res) =>{
   const id = req.params.id;
    const{title, author} = req.body;
    try{
      const updatedBook = await booksService.updateBook({id, updatesDados: {title, author}});
        res.status(200).json(updatedBook);
    } catch(error){
        res.status(500).json({message: error.message});
    }
})

module.exports = booksRouter;
