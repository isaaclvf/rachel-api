const { Reservation } = require("../models/reservation.model");
const { Book } = require("../models/book.model");
const {
    MissingFieldsError,
    NotFoundError,
    ConflictError,
} = require("../utils/error");

//busca reservas pelo ID do usuário
async function getReservationByUserId(userId) {
    const reservation = Reservation.find({ user: userId });
    if (!reservation) {
        throw new NotFoundError("reservation not found");
    }
    return reservation;
};

//busca reservas pelo ID do livro
async function getReservationByBookId(bookId) {
    const reservation = Reservation.find({ books: bookId });
    if (!reservation) {
        throw new NotFoundError("reservation not found");
    }
    return reservation;
};

//busca reservas pelos IDs do usuário e do livro
async function getReservationByUserIdAndBookId(userId, bookId) {
    const reservation = Reservation.find({ user: userId, books: bookId });
    if (!reservation) {
        throw new NotFoundError("reservation not found");
    }
    return reservation;
};

//cria uma nova reserva
async function createReservation(userId, bookId) {
    const book = booksService.getBookById(bookId);
    if (!book || bookId) {
        return res.status(400).json({ message: "Missing required fields or invalid id" });
    }
    const reservation = new Reservation({ user: userId, books: [bookId] });
    await reservation.save();

    book.reservedBy = userId;
    return await book.save();
};

//excluir reserva
async function deleteReservation(userId,bookId){
    const reservation = Reservation.find({ user: userId });
    if (!reservation) {
        throw new NotFoundError("reservation not found");
    }
    const deletedReservation = await Reservation.findByIdAndDelete(reservation._id);
    const bookUpdated = await Book.findByIdAndUpdate(bookId,{reservedBy: null});
    if (!bookUpdated) {
        throw new NotFoundError("book not found");
    }
    return deletedReservation;

};

module.exports = {
    getReservationByUserId,
    getReservationByBookId,
    getReservationByUserIdAndBookId,
    createReservation,
    deleteReservation
};