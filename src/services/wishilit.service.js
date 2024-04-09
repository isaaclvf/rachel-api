const express = require('express');
const router = express.Router();
const Wishlist = require('../models/wishlist'); 
const { Book } = require("../models/book.model");
const { User } = require("../models/users.model");

async function getWishlist(bookId, res) {
    try {
    const wishlist = await Wishlist.findOne({Book: req.bookId}).populate('books');
    if (!wishlist) {
        res.json({ message: 'Lista de desejos não encontrada' });
    } else {
        res.json(wishlist.books);
    }
} catch (error) {
    console.error('Erro ao buscar a lista de desejos:', error);
    res.status(500).json({ message: 'Ocorreu um erro ao buscar a lista de desejos' });
}
}

async function addFave(userId, bookId){
    try {
        const wishibook = await Wishlist.findOne({ user: userId });
        if (!wishibook) {
            return { success: false, message: 'Lista de desejos não encontrada' };
        }
        wishibook.Book.push(bookId);
        await wishibook.save();
        return { success: true, message: 'Livro adicionado à lista de desejos' };
    } catch (error) {
        console.error('Erro ao adicionar livro à lista de desejos:', error);
        return { success: false, message: 'Erro ao adicionar à lista de desejos' };
    }
}
async function deleteFav(userId, bookId){
    try {
        const wishlist = await Wishlist.findOne({ user: userId });
        if (!wishlist) {
            return { success: false, message: 'Lista de desejos não encontrada' };
        }
        const bookIndex = wishlist.books.indexOf(bookId);
        if (bookIndex > -1) {
            wishlist.books.splice(bookIndex, 1);
            await wishlist.save();
            return { success: true, message: 'Livro removido da lista de desejos' };
        } else {
            return { success: false, message: 'Livro não encontrado na lista de desejos' };
        }
    } catch (error) {
        console.error('Erro ao excluir livro da lista de desejos:', error);
        return { success: false, message: 'Erro ao excluir o livro' };
    }
}

module.exports = {
    getWishlist,
    addFave,
    deleteFav,
  };

