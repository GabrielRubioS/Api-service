"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("./routes/user")); // Asegúrate de importar el archivo de rutas correcto
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/', user_1.default); // Asegúrate de que el prefijo '/api' coincida con tus rutas en Postman
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
