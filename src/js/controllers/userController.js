import { connectDB } from '../config/db.js';

export const blockUser = (req, res) => {
    const db = connectDB();
    const { userId } = req.body;
    const query = 'UPDATE User SET blocked = 1 WHERE id = ?';

    db.query(query, userId, (error) => {
        if (error) res.status(500).send({ error });
        else res.send({ message: 'User blocked' });
    });
};

export const makeAdmin = (req, res) => {
    const db = connectDB();
    const { userId } = req.body;
    const query = 'UPDATE User SET UserRole_ManyToOne_id_role = (SELECT id FROM Role WHERE name = "admin") WHERE id = ?';

    db.query(query, userId, (error) => {
        if (error) res.status(500).send({ error });
        else res.send({ message: 'User promoted to admin' });
    });
};