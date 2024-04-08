const { Router } = require("express");
const userService = require("../services/user.service");
const loginRouter = Router();

loginRouter.post("/", async (req, res, next) => {
  try {
    const { registration, password } = req.body;

    if (!registration || !password) {
      return res.status(400).json({ message: "missing required fields" });
    }

    const user = await userService.getUserByRegistrationAndPassword(
      registration,
      password
    );

    if (!user) {
      return res
        .status(401)
        .json({ message: "user not found or incorrect password" });
    }

    return res.status(200).json({
      message: "login successful",
      user: {
        fullName: user.fullName,
        registration: user.registration,
        token: "jwt_token_here",
      },
    });
  } catch (error) {
    next(error);
  }
});

module.exports = loginRouter;
