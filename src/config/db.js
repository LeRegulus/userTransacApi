import { connect } from 'mongoose';
import 'dotenv/config';

async function connectDB() {
    try {
        await connect(process.env.MONGO_URI);
        console.log('Connexion à MongoDB réussie');
    } catch (error) {
        console.error('Erreur de connexion à MongoDB :', error);
        process.exit(1);
    }
}

export default connectDB;