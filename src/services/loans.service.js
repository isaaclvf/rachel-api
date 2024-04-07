const { Loan } = require("../models/loans.model");
const { Book } = require("../models/book.model");
const {
    MissingFieldsError,
    NotFoundError,
    ConflictError,
  } = require("../utils/error");

async function getLoanById(id) {
    const loan = await Loan.findById(id);
    if (!loan) {
        throw new NotFoundError("loan not found");
      }
    return loan;
}

async function getLoanByUserId(userId) {
    const loan = await Loan.find({ userId });
    if (!loan || loan.length === 0) {
      throw new NotFoundError("loan not found");
    }
    return loan;
}

async function getLoanByBookId(bookId) {
    const loan = await Loan.find({ bookId });
    if (!loan || loan.length === 0) {
      throw new NotFoundError("loan not found");
    }
    return loan;
}

async function getLoanByDate(loanDate) {
    const loan = await Loan.find({ loanDate });
    if (!loan || loan.length === 0) {
      throw new NotFoundError("loan not found");
    }
    return loan;
}

async function getLoanByReturnDate(returnDate) {
    const loan = await Loan.find({ returnDate });
    if (!loan || loan.length === 0) {
      throw new NotFoundError("loan not found");
    }
    return loan;
}

async function getLoanByStatus(status) {
    const loan = await Loan.find({ status });
    if (!loan || loan.length === 0) {
      throw new NotFoundError("loan not found");
    }
    return loan;
}

async function getAllLoans(page = 1, limit = 10) {
    const loans = await Loan.find().skip((page - 1) * limit).limit(limit);
    return loans;
}

async function createLoan({userId, bookId, loanDate, returnDate, status}){
    if (!userId || !bookId || !loanDate || !returnDate || !status){
        throw new MissingFieldsError("missing required fields");
    }
    const newLoan = new Loan({id, userId, bookId, loanDate, returnDate, status});
    return await newLoan.save();
}

async function deleteLoanById(id){
    const deletedLoan = await Loan.findByIdAndDelete(id);
    if (!deletedLoan) {
        throw new NotFoundError("loan not found");
      }
    return deletedLoan;
}

async function updateLoan(id, updates){
    if (!id || !updates || Object.keys(updates).length === 0) {
        throw new MissingFieldsError("missing required fields");
    }
    
    const existingLoan = await Loan.findById(id);
    if (!existingLoan) {
        throw new NotFoundError("loan not found");
    }
    
    const updatedLoan = await Loan.findByIdAndUpdate(id, updates, {
        new: true,
        runValidators: true,
    });
    return updatedLoan;
    
}

module.exports = {
    getLoanById,
    getLoanByUserId,
    getLoanByBookId,
    getLoanByDate,
    getLoanByReturnDate,
    getLoanByDate,
    getLoanByStatus,
    getAllLoans,
    createLoan,
    deleteLoanById,
    updateLoan
};
