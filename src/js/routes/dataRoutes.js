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
router.put('/update_data', updateData);
router.delete('/delete_data', deleteData);

export default router;