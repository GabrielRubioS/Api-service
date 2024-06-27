"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAvailabilityU = exports.sendLocation = exports.loginUser = exports.registerUser = void 0;
const hashUtil_1 = require("../utils/hashUtil");
const authService_1 = require("../services/authService");
const cacheService_1 = require("../services/cacheService");
// Simulación de base de datos en memoria
const users = [];
const mechanics = [];
// Funciones para usuarios
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    const hashedPassword = yield (0, hashUtil_1.hashPassword)(password);
    const newUser = { id: users.length + 1, name, email, password: hashedPassword, role: 'user' };
    users.push(newUser);
    res.status(201).json({ message: 'User registered successfully' });
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = users.find((u) => u.email === email);
    if (!user)
        return res.status(404).json({ message: 'User not found' });
    const isMatch = yield (0, hashUtil_1.comparePassword)(password, user.password);
    if (!isMatch)
        return res.status(400).json({ message: 'Invalid credentials' });
    const token = (0, authService_1.generateToken)(user);
    res.json({ token });
});
exports.loginUser = loginUser;
const sendLocation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, location } = req.body;
    yield (0, cacheService_1.setCache)(`location_${userId}`, location, 3600);
    res.json({ message: 'Location saved' });
});
exports.sendLocation = sendLocation;
const checkAvailabilityU = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Aquí deberías comprobar la disponibilidad de los mecánicos en la ubicación
    res.json({ available: true });
});
exports.checkAvailabilityU = checkAvailabilityU;
