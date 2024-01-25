const { comparePassword } = require('../helpers/bcrypt')
// const { signToken } = require('../helpers/jwt')
const { User } = require('../models');

const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

class UserController {
    static async Register(req, res, next) {
        try {
            const { username, email, password, role, address, phoneNumber } = req.body;
            if (!username || !password || !email) throw ({ name: `${!email ? 'Email' : !password  ? 'Password': 'Username'} is null` })

            let o = await User.findOne({where : {email: email}});
            if (o) {
                // Record Found
                throw ({ name: "email must be unique" });
            }
            
            if (!emailRegexp.test(email)){
                throw ({ name: "invalid email format" });
            }

            await User.create({
                username, email, password, role, address, phoneNumber
            })

            res.status(201).json({ message: "Register account success" })
        } catch (error) {
            res.status(500).json({ code: 500, message: [error.name] })
        }
    }

    static async Login(req, res, next) {
        try {
            const { email, password } = req.body;
            if (!password || !email) throw ({ name: `${!email ? 'Email' : 'Password'} is null` });

            let user = await User.findOne({
                where: {
                    email
                }
            }
            )
            if (!user) throw ({ name: "invalid email / password" });

            const isCorrect = comparePassword(password, user.password);
            if (!isCorrect) throw ({ name: "invalid email / password" });

            // const token = signToken({ id: user.id, email: email })
            // user = await User.findByPk(user.id, {
            //     attributes: {
            //         exclude: ['createdAt', 'updatedAt', 'password']
            //     }
            // })

            // res.status(200).json({ access_token: token, dataUser: user })
            res.status(200).json({ dataUser: user })
        } catch (error) {
            res.status(500).json({ code: 500, message: [error.name] })
        }
    }

}

module.exports = UserController