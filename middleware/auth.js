const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    // Leer el token del header
    const token = req.header('x-auth-token');

    // Revisar si no hay token
    if(!token) {
        return res.status(401).json({msg: 'You need a token'})
    }

    // validar el token

    try {
        const cifrado = jwt.verify(token, process.env.SECRET);
        req.user = cifrado.user;
        next();
    } catch (error) {
        res.status(401).json({msg: 'Invalid Token'});
    }
}