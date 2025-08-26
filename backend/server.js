import express from 'express';
import morgan from 'morgan'; 
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 9000;

app.use(morgan('dev'));

app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Hay que darnos de baja' });
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});