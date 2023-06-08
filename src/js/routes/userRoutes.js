import express from 'express';
import { blockUser, makeAdmin, userRegistration, userAuthorization } from '../controllers/userController.js';

const router = express.Router();

router.post('/block_user', blockUser);
router.post('/make_admin', makeAdmin);

router.post('/register', userRegistration);
router.post('/auth', userAuthorization);

export default router;