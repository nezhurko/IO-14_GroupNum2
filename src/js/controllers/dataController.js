import { connectDB } from '../config/db.js';

export const viewData = (req, res) => {
    const db = connectDB();
    const query = 'SELECT * FROM Data WHERE blocked = 0';

    db.query(query, (error, results) => {
        if (error) res.status(500).send({ error });
        else res.send(results);
    });
};

export const generateTable = (req, res) => {
    const db = connectDB();
    const { userId } = req.body;
    const query = 'SELECT * FROM Data WHERE Creator = ?';

    db.query(query, userId, (error, results) => {
        if (error) res.status(500).send({ error });
        else res.send(results);
    });
};

export const addData = (req, res) => {
    const db = connectDB();
    const {
        name,
        description,
        content,
        creatorId,
        categoryId
    } = req.body;
    const newData = {
        name,
        description,
        content,
        date_creation: new Date(),
        blocked: 0,
        DataCategory_ManyToOne_CategoryId: categoryId,
        Creator: creatorId
    };

    const query = 'INSERT INTO Data SET ?';

    db.query(query, newData, (error) => {
        if (error) res.status(500).send({ error });
        else res.send({ message: 'Data added' });
    });
};

export const updateData = (req, res) => {
    const db = connectDB();
    const { dataId, name, description, content } = req.body;
    const query = 'UPDATE Data SET name = ?, description = ?, content = ? WHERE id = ?';

    db.query(query, [name, description, content, dataId], (error) => {
        if (error) res.status(500).send({ error });
        else res.send({ message: 'Data updated' });
    });
};

export const deleteData = (req, res) => {
    const db = connectDB();
    const { dataId } = req.body;
    const query = 'DELETE FROM Data WHERE id = ?';

    db.query(query, dataId, (error) => {
        if (error) res.status(500).send({ error });
        else res.send({ message: 'Data deleted' });
    });
};