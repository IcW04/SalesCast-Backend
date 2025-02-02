const jwt = require("jsonwebtoken");

const generateToken = (payload) => {

    const secret = process.env.JWT_SECRET;
    const options = {
        expiresIn: process.env.JWT_EXPIRES
    };

    const token = jwt.sign(payload, secret, options);
    return token;

}

const validateToken = (req, res, next) => {

    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1]; // El header viene de tipo Bearer eyJ0a...

        jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
            
            if (err) {
                return res.status(403).json({
                    ok: false,
                    message: 'Invalid or expired token'
                });
            }
            else {
                req.jwt_data = payload;
                // console.log(payload);
                next();
            }

        });

    } else {

        res.status(401).json({
            ok: false,
            message: 'Token was not provided'
        });

    }

}

module.exports = {
    generateToken,
    validateToken
}