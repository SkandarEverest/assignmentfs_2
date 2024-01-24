const { comparePassword } = require('../helpers/bcrypt')
const { signToken } = require('../helpers/jwt')
const { User } = require('../models')

class UserController {
    static async register(req, res, next) {
        try {
            const { username, password, email } = req.body
            if (!username || !password || !email) throw ({ name: "cannotEmpty" })

            await User.create({
                username, email, password
            })

            res.status(201).json({ message: "Register account success" })
        } catch (error) {
            next(error)
        }
    }

    static async login(req, res, next) {
        try {
            const { email, password } = req.body
            if (!email || !password) throw ({ name: "cannotEmpty" })

            let user = await User.findOne({
                where: {
                    email
                }
            }
            )
            if (!user) throw ({ name: "EmailPasswordInvalid" })

            const isValid = comparePassword(password, user.password)
            if (!isValid) throw ({ name: "EmailPasswordInvalid" })
            const token = signToken({ id: user.id, email: email })
            user = await User.findByPk(user.id, {
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'password']
                }
            })

            res.status(200).json({ access_token: token, dataUser: user })
        } catch (error) {
            next(error)
        }
    }

}

module.exports = UserController