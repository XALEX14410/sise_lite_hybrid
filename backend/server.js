import express from 'express';
import morgan from 'morgan'

const app = express();
const PORT = process.env.PORT || 9000;

app.use(morgan('dev'));

app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).json({ message: 'status:ok' });
});

app.get('/api/prueba', (req, res) => {
    res.status(200).json({ message: 'Este es solo de prueba, pronto se tendrá más si Dios quiere y lo permite' });
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});