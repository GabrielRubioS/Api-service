"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setCache = exports.getCache = void 0;
const redis_1 = __importDefault(require("../config/redis"));
const getCache = (key) => {
    return new Promise((resolve, reject) => {
        redis_1.default.get(key, (err, data) => {
            if (err)
                reject(err);
            resolve(data ? JSON.parse(data) : null);
        });
    });
};
exports.getCache = getCache;
const setCache = (key, value, ttl) => {
    redis_1.default.set(key, JSON.stringify(value), 'EX', ttl);
};
exports.setCache = setCache;
