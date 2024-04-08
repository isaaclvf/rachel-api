const express = require('express');
const router = express.Router();
const Wishlist = require('../models/wishlist'); 
const { Book } = require("../models/book.model");
const { User } = require("../models/users.model");

async function getWishlist(req, res) {
    const wishlist = await Wishlist.findOne({user: req.user.id}).populate('books');
    if (!wishlist) {
        res.json({ message: 'Lista de desejos não encontrada' });
        return;
    }
    res.json(wishlist.books);
}

async function addFave(res, req){
    const wishibook = await findOneById ({ user: req.user.id })
    if (!wishibook) {
        res.json({ message: 'Lista de desejos não encontrada' });
        return;
    }
    wishibook.Book.push(req.params.bookId);
    await wishibook.save();
        res.json({ message: 'Livro adicionado a sua lista de desejo' });
    }

async function deleteFav(req, res){
        const wishlist = await Wishlist.findOne({user: req.user.id});
        if (!wishlist) {
            res.json({ message: 'Lista de desejos não encontrada' });
            return;
        }
        
        const bookindex = wishlist.books.indexOf(req.params.bookId);
        if (bookIndex > -1) {
            wishlist.books.splice(bookindex, 1);
            await wishlist.save();
            res.json({ message: 'Livro removido da lista de desejos' });
        }
        else{
            res.status(404).json({ message: 'Livro não encontrado na lista de desejos' });
        }
    }

module.exports = {
    getWishlist,
    addFave,
    deleteFav,
  };

