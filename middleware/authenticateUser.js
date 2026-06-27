const jwt = require('jsonwebtoken');
const AppError = require("../utils/AppError")

const authenticateUser = (req, res, next) => {
    let token = req.headers.authorization ?? '';
    token = token.split(" ")[1] ?? '';

    if (token == '') {
        return next(new AppError(404, "MISSING_TOKEN", "Missing token in headr."));
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, response) => {
        if (err) {
            return next(new AppError(404, "INVALID_TOKEN", "Invalid or expried token."));
        }
        req.userData = response;
        next();
    })
}

module.exports = authenticateUser;