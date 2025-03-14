import User from '../models/User.js';
import Transaction from '../models/Transaction.js';

async function getUsers(req, res) {
    try {

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const users = await User.find().skip(skip).limit(limit).populate('transactions');
        const totalUsers = await User.countDocuments();

        res.status(200).json({
            data: users,
            pagination: {
                total: totalUsers,
                page,
                limit,
                totalPages: Math.ceil(totalUsers / limit),
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
}

const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Tous les champs sont requis" });
        }
        const newUser = await User.create({ name, email, password });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
};

const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
};

const updateUser = async (req, res) => {
    try {
        const { name, email } = req.body;
        const updatedUser = await User.findByIdAndUpdate(req.params.id, { name, email }, { new: true });
        if (!updatedUser) return res.status(404).json({ message: "Utilisateur non trouvé" });
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
};

const deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) return res.status(404).json({ message: "Utilisateur non trouvé" });
        res.status(200).json({ message: "Utilisateur supprimé" });
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
};

export default { getUsers, createUser, getUserById, updateUser, deleteUser };
