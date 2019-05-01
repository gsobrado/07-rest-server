const jwt = require('jsonwebtoken');

// ===========================================
//  Verificar Token
// ===========================================

let verificarToken = (req, res, next) => {

    let token = req.get('Authorization');

    jwt.verify(token, process.env.SEED_TOKEN, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                mensaje: {
                    message: 'Token Invalido'
                }
            });
        }

        req.usuario = decoded.usuario;
        next();
    });
};

let verificarRole = (req, res, next) => {

    let usuario = req.usuario;

    if (usuario.role === 'ADMIN_ROLE') {
        next();
    } else {
        return res.status(401).json({
            ok: false,
            mensaje: {
                message: 'El Usuario no es Administrador'
            }
        });
    }
};

module.exports = {
    verificarToken,
    verificarRole
}