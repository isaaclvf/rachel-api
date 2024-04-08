const { Loan } = require("../models/loans.model");
const { Book } = require("../models/book.model");
const {
    MissingFieldsError,
    NotFoundError,
    ConflictError,
  } = require("../utils/error");

//busca empréstimo pelo ID
async function getLoanById(id) {
    const loan = await Loan.findById(id);
    if (!loan) {
        throw new NotFoundError("loan not found");
      }
    return loan;
}

//busca empréstimo pelo ID do usuário
async function getLoanByUserId(userId) {
    const loan = await Loan.find({ userId });
    if (!loan) {
      throw new NotFoundError("loan not found");
    }
    return loan;
}

//busca empréstimo pelo ID do livro
async function getLoanByBookId(bookId) {
    const loan = await Loan.find({ bookId });
    if (!loan) {
      throw new NotFoundError("loan not found");
    }
    return loan;
}

//busca empréstimo pela data
async function getLoanByDate(loanDate) {
    const loan = await Loan.find({ loanDate });
    if (!loan) {
      throw new NotFoundError("loan not found");
    }
    return loan;
}

//busca empréstimo pela data de devolução
async function getLoanByReturnDate(returnDate) {
    const loan = await Loan.find({ returnDate });
    if (!loan) {
      throw new NotFoundError("loan not found");
    }
    return loan;
}

//busca empréstimo pelo status
async function getLoanByStatus(status) {
    const loan = await Loan.find({ status });
    if (!loan) {
      throw new NotFoundError("loan not found");
    }
    return loan;
}

//retorna todos os empréstimos
async function getAllLoans(page = 1, limit = 10) {
    const loans = await Loan.find().skip((page - 1) * limit).limit(limit);
    return loans;
}

//cria empréstimo
async function createLoan({userId, bookId, loanDate, returnDate, status}){
    if (!userId || !bookId || !loanDate || !returnDate || !status){
        throw new MissingFieldsError("missing required fields");
    }
    const newLoan = new Loan({id, userId, bookId, loanDate, returnDate, status});
    return await newLoan.save();
}

//deleta empréstimo
async function deleteLoanById(id){
    const deletedLoan = await Loan.findByIdAndDelete(id);
    if (!deletedLoan) {
        throw new NotFoundError("loan not found");
      }
    return deletedLoan;
}

//atualiza dados de empréstimo
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
