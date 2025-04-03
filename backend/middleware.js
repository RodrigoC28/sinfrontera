const jwt = requira('jsonwebtoken');
const config = require('./config/config.js');

//cada pedido a um endpoint valida token da autenticação
const checkToken = (req, res, next) => {
    const token = req.headers['x-access-token'] ||
    req.headers['authorization'];

    if (token != undefined && token.startsWith('Bearer ')){
        token = token.slice(7, token.length);
    }

    //token existe
    if(token) {
        jwt.verify(token, config.secret, (error, decoded) => {
            if (error) {
                return res.json({
                    sucess: false,
                    message: "Token é inválido",
                });
            } else {
                req.decoded = decoded;
                next();
            }
        })
    } else {
        return res.json({
            sucess: false,
            message: "O token é inválido"
        })
    }
}

module.exports = {
    checkToken: checkToken
}