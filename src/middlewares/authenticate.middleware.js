import jwt from 'jsonwebtoken';
import 'dotenv/config';

export function authenticateToken(req, res, next) {
    //get jwt token fro header of autherization
    const authHeader = req.headers['authorization'];
    console.log('authHeader', authHeader);
    const token = authHeader && authHeader.split(' ')[1]
    if (!token) return res.sendStatus(401);

    //verify and decode token
    const secret = process.env.JWT_SECRET;
    console.log('secret:' + secret);
    jwt.verify(token, secret, (err, user) => {
        if (err) {
            console.log('error', err)
            return res.sendStatus(403);
        }

        //if token is valid
        console.log('user', user);
        req.user = user;
        next();
    })
}