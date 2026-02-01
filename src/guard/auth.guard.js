const { globalError, ClientError } = require("shokhijakhon-error-handler");
const jwtService = require("../lib/jwt.service");

module.exports = (req, res, next) => {
  try {
    let auth = req.headers.authorization;
    if (!auth) throw new ClientError("Unauthorized", 401);
    let type = auth.split(" ")[0];
    let token = auth.split(" ")[1];
    if (!token || type != "Bearer") throw new ClientError("Unauthorized", 401);
    let parseToken = jwtService.parseToken(token);
    req.user = parseToken;
    return next();
  } catch (err) {
    return globalError(err, res);
  }
};
