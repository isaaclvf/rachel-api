const { Loan } = require("../models/loans.model");
const { Book } = require("../models/book.model");

async function getById(id) {
    return await Loan.findById(id);
}

async function getAllLoans(page, limit) {
    return await Loan.find();
}

async function createLoan({id, idUser, idBook, loanDate, returnDate, status}){
    const newLoan = new Loan({id, idUser, idBook, loanDate, returnDate, status});
    return await newLoan.save();
}

async function deleteLoanById(id){
    return await Loan.findByIdAndDelete(id);
}

async function updateLoan(id, {idUser, idBook, loanDate, returnDate, status}){
    return await Loan.findOneAndUpdate(id,{idUser, idBook, loanDate, returnDate, status});
}

module.exports = {
    getById,
    getAllLoans,
    createLoan,
    deleteLoanById,
    updateLoan
};
