const userRouter = require("../routes/user");
const authRouter = require("../routes/auth");

const routes = (app) => {
  app.use("/api/v1/user", userRouter);
  app.use("/api/v1/auth", authRouter);
};

module.exports = routes;
