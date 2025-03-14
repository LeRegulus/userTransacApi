import express, { json } from 'express';
import { config } from 'dotenv';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';
import cors from 'cors';
import helmet from 'helmet';
import xss from 'xss-clean';
import mongoSanitize from 'express-mongo-sanitize';


config();

connectDB();

const app = express();
app.use(helmet()); 
app.use(mongoSanitize())
app.use(xss())
app.use(cors());
app.use(json());

app.use('/users', userRoutes);
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('Bienvenue sur l\'api userTransaction');
});

app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
