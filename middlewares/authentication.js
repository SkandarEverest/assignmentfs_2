const { User } = require('../models')
const { verifyToken } = require("../helpers/jwt")

async function authentication(req, res, next) {
    try {
        const bearerHeader = req.headers['authorization'];
        if (!bearerHeader) throw ({ name: 'Authentication Error' });

        //split the space at the bearer
        const bearer = bearerHeader.split(' ');
        //Get token from string
        const bearerToken = bearer[1];


        console.log(bearerToken);
        // if (!access_token) throw ({ name: "AuthenticationError" })

        // const verified = verifyToken(access_token)
        // if (!verified) throw ({ name: "AuthenticationError" })
        
        // const user = await User.findByPk(verified.id)
        // // console.log('user>>',user)
        // if (!user) throw ({ name: "AuthenticationError" })
        // req.user = {
        //     id: verified.id,
        //     email: verified.email
        // }
        next()
    } catch (error) {
        res.status(401).json({ code: 500, message: [error.name] })
    }
}

module.exports = authentication