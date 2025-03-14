import { Router } from 'express';
import userController from '../controllers/userController.js';
import protect from '../middleware/authMiddleware.js';
import transactionController from '../controllers/transactionController.js';

const router = Router();

router.get('/', protect, userController.getUsers);
router.post('/', protect, userController.createUser);
router.get('/:id', protect, userController.getUserById);
router.put('/:id', protect, userController.updateUser);
router.delete('/:id', protect, userController.deleteUser);


router.post('/:id/transactions', protect, transactionController.createTransaction);
router.get('/:id/transactions', protect, transactionController.getTransactions);

export default router;
