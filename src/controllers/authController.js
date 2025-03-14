import User from '../models/User.js';
import jwt from 'jsonwebtoken';

// Générer un token JWT
const generateToken = (user) => {
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Inscription
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Tous les champs sont requis" });
        }

        // Vérifier si l'utilisateur existe déjà
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "L'email est déjà utilisé" });
        }

        // Créer l'utilisateur
        const newUser = await User.create({ name, email, password });
        // Vérifier si l'utilisateur a bien été créé
        if (newUser) {
            console.log('Nouvel utilisateur créé :', newUser);  // Ajoute un log pour confirmer la création
        }
        res.status(201).json({ 
            _id: newUser._id, 
            name: newUser.name, 
            email: newUser.email, 
            token: generateToken(newUser),
            message: "Utilisateur créé avec succès"
        });
    } catch (error) {
        console.error('Erreur serveur lors de l\'inscription :', error);
        res.status(500).json({ message: "Erreur serveur", error });
    }
};

// Connexion
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Tous les champs sont requis" });
        }

        // Vérifier l'utilisateur
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ message: "Identifiants incorrects" });
        }

        res.status(200).json({ 
            _id: user._id, 
            name: user.name, 
            email: user.email, 
            token: generateToken(user),
            message: "Connexion réussie"

        });
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
};

export default { register, login };
