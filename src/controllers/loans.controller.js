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
            throw new MissingFieldsError("Preencha todos os campos obrigatórios");
        }
        const newLoan = await Loan.create({ userId, bookId, dueDate });
        return res.status(201).json(newLoan);
    } catch (error) {
        console.error('Erro ao criar empréstimo:', error);
        if (error instanceof MissingFieldsError || error instanceof NotFoundError) {
            return res.status(400).json({ message: error.message });
        }
        return res.status(500).json({ message: 'Ocorreu um erro ao criar o empréstimo' });
    }
});

module.exports = loansRouter;
