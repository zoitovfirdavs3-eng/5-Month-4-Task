const { globalError, ClientError } = require("shokhijakhon-error-handler");
const hashService = require("../lib/hash.service");
const UserModel = require("../models/User.model");
const jwtService = require("../lib/jwt.service");
const {
  registerValidator,
  loginValidator,
} = require("../utils/validator/User.validator"); // ✅ MUHIM

module.exports = {
  async REGISTER(req, res) {
    try {
      let newUser = req.body;

      await registerValidator.validateAsync(newUser);

      newUser.password = await hashService.hashPassword(newUser.password);

      const insertUser = await UserModel.create(newUser);

      const accessToken = jwtService.createToken({ user_id: insertUser._id });

      return res.status(201).json({
        message: "User successfully registered !",
        status: 201,
        accessToken,
      });
    } catch (err) {
      return globalError(err, res);
    }
  },

  async LOGIN(req, res) {
    try {
      const user = req.body;

      await loginValidator.validateAsync(user);

      const findUser = await UserModel.findOne({ email: user.email });
      if (!findUser) throw new ClientError("User not found", 404);

      const ok = await hashService.comparePassword(
        user.password,
        findUser.password,
      );
      if (!ok) throw new ClientError("Invalid password", 401);

      const accessToken = jwtService.createToken({ user_id: findUser._id });

      return res.json({
        message: "User successfully logged in !",
        status: 200,
        accessToken,
      });
    } catch (err) {
      return globalError(err, res);
    }
  },
};
