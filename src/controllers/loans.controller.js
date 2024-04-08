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

module.exports = loansRouter;
