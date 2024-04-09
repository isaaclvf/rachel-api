const { Router } = require("express");
const loansService = require("../services/loans.service");
const loansRouter = Router();

loansRouter.get("/", async (req, res, next) => {
  try {
    const { page, limit } = req.query;
    const loans = await loansService.getAllLoans(page, limit);
    res.status(200).json(loans);
  } catch (error) {
    next(error);
  }
});

loansRouter.post("/", async (req, res, next) => {
  try {
    const { userId, bookId, dueDate } = req.body;
    
    if (!userId || !bookId || !dueDate) {
      throw new MissingFieldsError("missing required field");
    }

    const newLoan = await Loan.create({ userId, bookId, dueDate });
    return res.status(201).json(newLoan);
  } catch (error) {
    next(error)
  }
});

module.exports = loansRouter;
