import express from 'express';
import { blockUser, makeAdmin } from '../controllers/userController.js';

const router = express.Router();

router.put('/block_user', blockUser);
router.put('/make_admin', makeAdmin);

export default router;