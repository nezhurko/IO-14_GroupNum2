import express from 'express';
import {
    viewData,
    generateTable,
    addData,
    updateData,
    deleteData
} from '../controllers/dataController.js';

const router = express.Router();

router.get('/', viewData);
router.post('/generate_table', generateTable);
router.post('/add_data', addData);
router.post('/update_data', updateData);
router.post('/delete_data', deleteData);

export default router;