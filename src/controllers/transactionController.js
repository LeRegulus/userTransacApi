import Transaction from '../models/Transaction.js';
import User from '../models/User.js';

const createTransaction = async (req, res) => {
    try {
        const { id } = req.params;
        const { amount, description } = req.body;

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }

        const transaction = await Transaction.create({
            user: id,
            amount,
            description
        });

        await User.findByIdAndUpdate(id, {
            $push: { transactions: transaction._id }
        });

        res.status(201).json(transaction);
        } catch (error) {
            res.status(500).json({ message: "Erreur serveur", error });
        }
};

const getTransactions = async (req, res) => {
    try {
        const { id } = req.params;
        const transactions = await Transaction.find({ user: id });
        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error });
    }
};

export default { createTransaction, getTransactions };
