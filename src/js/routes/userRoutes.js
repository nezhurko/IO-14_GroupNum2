import express from 'express';
import { blockUser, makeAdmin } from '../controllers/userController.js';

const router = express.Router();

router.post('/block_user', blockUser);
router.post('/make_admin', makeAdmin);

export default router;