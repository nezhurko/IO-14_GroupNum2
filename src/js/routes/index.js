import express from 'express';
import dataRoutes from './dataRoutes.js';
import userRoutes from './userRoutes.js';

const router = express.Router();

router.use('/', dataRoutes);
router.use('/', userRoutes);

export default router;