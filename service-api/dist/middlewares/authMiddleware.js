"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const authService_1 = require("../services/authService");
const authMiddleware = (req, res, next) => {
    (0, authService_1.verifyToken)(req, res, next);
};
exports.authMiddleware = authMiddleware;
