const { hash, compare } = require("bcrypt");

module.exports = {
  hashPassword: password => hash(password, 10),
  comparePassword: (password, hashPassword) => compare(password, hashPassword),
};
