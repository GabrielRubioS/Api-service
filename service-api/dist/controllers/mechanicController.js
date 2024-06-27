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
exports.loginmechanics = exports.checkAvailabilityM = exports.registerMechanic = void 0;
const hashUtil_1 = require("../utils/hashUtil");
const authService_1 = require("../services/authService");
const mechanics = [];
const registerMechanic = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    const hashedPassword = yield (0, hashUtil_1.hashPassword)(password);
    const newMechanic = { id: mechanics.length + 1, name, email, password: hashedPassword, role: 'mechanic', available: true };
    mechanics.push(newMechanic);
    res.status(201).json({ message: 'Mechanic registered successfully' });
});
exports.registerMechanic = registerMechanic;
const checkAvailabilityM = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { location } = req.query; // Suponiendo que 'location' es el parámetro de ubicación
    const availableMechanics = mechanics.filter(mechanic => mechanic.available && mechanic.location === location);
    res.json({ availableMechanics });
});
exports.checkAvailabilityM = checkAvailabilityM;
const loginmechanics = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const mechanic = mechanics.find((u) => u.email === email);
    if (!mechanic)
        return res.status(404).json({ message: 'Mechanic not found' });
    const isMatch = yield (0, hashUtil_1.comparePassword)(password, mechanic.password);
    if (!isMatch)
        return res.status(400).json({ message: 'Invalid credentials' });
    const token = (0, authService_1.generateToken)(mechanic);
    res.json({ token });
});
exports.loginmechanics = loginmechanics;
