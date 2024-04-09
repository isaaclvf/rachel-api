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

async function getLoansByUserId(userId) {
  const loans = await Loan.find({ userId });

  return loans;
}

async function getLoanByBookId(bookId) {
  const loan = await Loan.find({ bookId });
  if (!loan) {
    throw new NotFoundError("loan not found");
  }
  return loan;
}

async function getLoanByDate(loanDate) {
  const loan = await Loan.find({ loanDate });
  if (!loan) {
    throw new NotFoundError("loan not found");
  }
  return loan;
}

async function getLoanByReturnDate(returnDate) {
  const loan = await Loan.find({ returnDate });
  if (!loan) {
    throw new NotFoundError("loan not found");
  }
  return loan;
}

async function getLoanByStatus(status) {
  const loan = await Loan.find({ status });
  if (!loan) {
    throw new NotFoundError("loan not found");
  }
  return loan;
}

async function getAllLoans(page = 1, limit = 10) {
  const loans = await Loan.find()
    .skip((page - 1) * limit)
    .limit(limit);
  return loans;
}

async function createLoan({ userId, bookId, loanDate, returnDate, status }) {
  if (!userId || !bookId || !loanDate || !returnDate || !status) {
    throw new MissingFieldsError("missing required fields");
  }
  const newLoan = new Loan({
    id,
    userId,
    bookId,
    loanDate,
    returnDate,
    status,
  });
  return await newLoan.save();
}

async function deleteLoanById(id) {
  const deletedLoan = await Loan.findByIdAndDelete(id);
  if (!deletedLoan) {
    throw new NotFoundError("loan not found");
  }
  return deletedLoan;
}

async function updateLoan(id, updates) {
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

async function getDebt(loanId) {
  const existingLoan = await Loan.findById(loanId);

  if (!existingLoan) {
    throw new NotFoundError("loan not found");
  }

  const { dueDate } = existingLoan;
  const returnedDate = new Date();

  if (returnedDate <= dueDate) {
    return 0;
  }

  const diffTime = Math.abs(returnedDate - dueDate);  // In milliseconds
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  const dailyFine = 0.05;
  const debt = diffDays * dailyFine;

  return debt;
}

module.exports = {
  getLoanById,
  getLoansByUserId,
  getLoanByBookId,
  getLoanByDate,
  getLoanByReturnDate,
  getLoanByDate,
  getLoanByStatus,
  getAllLoans,
  createLoan,
  deleteLoanById,
  updateLoan,
  getDebt,
};
