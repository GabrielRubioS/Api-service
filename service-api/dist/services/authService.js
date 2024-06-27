"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secret = 'your_secret_key';
const generateToken = (user) => {
    return jsonwebtoken_1.default.sign({ id: user.id, role: user.role }, secret, { expiresIn: '1h' });
};
exports.generateToken = generateToken;
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token)
        return res.status(403).json({ message: 'No token provided' });
    jsonwebtoken_1.default.verify(token, secret, (err, decoded) => {
        if (err)
            return res.status(500).json({ message: 'Failed to authenticate token' });
        req.userId = decoded.id;
        next();
    });
};
exports.verifyToken = verifyToken;
