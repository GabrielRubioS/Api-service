import { Request, Response } from 'express';
import { hashPassword, comparePassword } from '../utils/hashUtil';
import { generateToken } from '../services/authService';
import { getCache, setCache } from '../services/cacheService';
const mechanics: any[] = [];


export const registerMechanic = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    const hashedPassword = await hashPassword(password);
    const newMechanic = { id: mechanics.length + 1, name, email, password: hashedPassword, role: 'mechanic', available: true };
    mechanics.push(newMechanic);
    res.status(201).json({ message: 'Mechanic registered successfully' });
};

export const checkAvailabilityM = async (req: Request, res: Response) => {
    const { location } = req.query; // Suponiendo que 'location' es el parámetro de ubicación
    const availableMechanics = mechanics.filter(mechanic => mechanic.available && mechanic.location === location);
    res.json({ availableMechanics });
};

export const loginmechanics = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const mechanic = mechanics.find((u) => u.email === email);
    if (!mechanic) return res.status(404).json({ message: 'Mechanic not found' });
    const isMatch = await comparePassword(password, mechanic.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
    const token = generateToken(mechanic);
    res.json({ token });
};