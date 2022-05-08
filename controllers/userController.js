const { User, Cart } = require("../models/models");
const ApiError = require('../error/apiArror')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const generateJwt = (id, email, role) => {
   return jwt.sign(
        {id, email, role}, 
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
        )

}

class UserController {
    async registration(req, res, next) {
        const { email, password, role} = req.body
        if (!email || !password) {
            return next(ApiError.badRequest(`Email or password don't mentioned`))
        }
        const candidate = await User.findOne({where: {email}})
        if (candidate) {
            return next(ApiError.badRequest(`Email is already used`)) 
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({email, role, password: hashPassword})
        const token = generateJwt(user.id, user.email, user.role)
            return res.json({token})
    }
    async login(req, res, next) {
        const { email, password} = req.body
        if (!email || !password) {
            return next(ApiError.badRequest(`Email or password don't mentioned`))
        }
        const candidate = await User.findOne({where: {email}})
        if (!candidate) {
            return next(ApiError.internal(`Email is not registered`)) 
        }
        let comparePassword = bcrypt.compareSync(password, candidate.password)
        if (!comparePassword) {
            return next(ApiError.internal(`Email or password don't compated`))
        }
        const token = generateJwt(candidate.id, candidate.email, candidate.role)
        return res.json({token})
    }
    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.email, req.user.role)
        return res.json({token})
    }
}

module.exports = new UserController()