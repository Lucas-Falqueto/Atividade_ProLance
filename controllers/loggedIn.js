require('dotenv').config()
const jwt = require('jsonwebtoken')
const UserController = require('./UserController')

const loggedIn = async (req, res, next) => {
    if (!req.cookies.userRegistered) return next()
    try {
        const decoded = jwt.verify(req.cookies.userRegistered, process.env.KEY_API)
        const user = await new UserController().findID(decoded.id)
        for (const userInfo of user) {
            req.user = { id: userInfo.id, name: userInfo.name, numero: userInfo.numero, sobre_mim: userInfo.sobre_mim, email: userInfo.email }
        }
        return next()
    } catch (err) {
        if (err) return next()
    }

}

module.exports = loggedIn