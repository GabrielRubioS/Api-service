import express from 'express';
import userRoutes from './routes/user'; // Asegúrate de importar el archivo de rutas correcto

const app = express();

app.use(express.json());
app.use('/', userRoutes); // Asegúrate de que el prefijo '/api' coincida con tus rutas en Postman

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
