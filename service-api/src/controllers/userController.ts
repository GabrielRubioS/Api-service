"use strict";
import { Request, Response } from 'express';
import { hashPassword, comparePassword } from '../utils/hashUtil';
import { generateToken } from '../services/authService';
import { getCache, setCache } from '../services/cacheService';

// Simulación de base de datos en memoria
const users: any[] = [];
const mechanics: any[] = [];

// Funciones para usuarios
export const registerUser = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    const hashedPassword = await hashPassword(password);
    const newUser = { id: users.length + 1, name, email, password: hashedPassword, role: 'user' };
    users.push(newUser);
    res.status(201).json({ message: 'User registered successfully' });
};

export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = users.find((u) => u.email === email);
    if (!user) return res.status(404).json({ message: 'User not found' });
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
    const token = generateToken(user);
    res.json({ token });
};

export const sendLocation = async (req: Request, res: Response) => {
    const { userId, location } = req.body;
    await setCache(`location_${userId}`, location, 3600);
    res.json({ message: 'Location saved' });
};

export const checkAvailabilityU = async (req: Request, res: Response) => {
    // Aquí deberías comprobar la disponibilidad de los mecánicos en la ubicación
    res.json({ available: true });
};



