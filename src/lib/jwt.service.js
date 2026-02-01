const { sign, verify } = require("jsonwebtoken");

module.exports = {
  createToken: payload =>
    sign(payload, process.env.SECRET_TOKEN_KEY, { expiresIn: "1d" }),
  parseToken: token => verify(token, process.env.SECRET_TOKEN_KEY),
};
