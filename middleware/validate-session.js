const jwt = require('jsonwebtoken');
const { User } = require('../models');

const validateSession = async (req, res, next) => {

    if(req.method === 'OPTIONS') {
        return next();
    } else if(req.headers.authorization) {

        const {authorization} = req.headers;
        console.log('AUTH:', authorization);
        const payload = authorization ? jwt.verify(authorization, process.env.JWT_SECRET) : undefined;
        console.log('PAYLOAD', payload);

        if(payload) {

            let foundUser = await User.findOne({
                where: { id: payload.id }
            });

            console.log('FOUND USER:', foundUser);

            if(foundUser) {
                req.user = foundUser;
                next();
            } else {
                res.status(400).send({ msg: 'Not Authorized'})
            }
        } else {
            res.status(401).send({ msg: 'Forbidden'})
        }
    } else {
        res.status(403).send({ msg: 'Forbidden'})
    }
}

module.exports = validateSession;