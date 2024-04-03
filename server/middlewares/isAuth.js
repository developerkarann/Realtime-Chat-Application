const jwt = require("jsonwebtoken");
const { ErrorHandler } = require("../utils/utility");
const { TryCatch } = require("./error");

exports.isAuthenticated = TryCatch(async (req, res, next) => {

    const token = req.cookies['token'];

    if (!token) {
        return next(new ErrorHandler('Please login to access this route', 401))
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET)

    req.user = decodedData._id;

    next()

})

exports.isAdmin = TryCatch(async (req, res, next) => {
    const token = req.cookies['admin-token'];

    if (!token) {
        return next(new ErrorHandler('Only Admin Can Access This Route', 401))
    }

    const adminId = jwt.verify(token, process.env.JWT_SECRET)

    const adminSecretKey = process.env.ADMIN_SECRET_KEY;

    const isMatched = adminId === adminSecretKey;

    if (!isMatched) return next(new ErrorHandler('Only Admin Can Access This Route', 401))

    next()
})
