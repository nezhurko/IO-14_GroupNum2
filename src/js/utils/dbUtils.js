import { connectDB } from '../config/db.js';

export const handleDBError = (res, error) => {
  console.error('Database error:', error);
  return res.status(500).send({ error });
};

export const handleDBResults = (res, results) => {
  return res.send(results);
};

export const checkUserBlocked = (userId, callback) => {
  const db = connectDB();
  const userQuery = 'SELECT * FROM User WHERE id = ? AND blocked = 0';
  db.query(userQuery, [userId], (error, results) => {
    if (error) {
      return callback(error);
    }

    if (results.length === 0) {
      return callback(new Error('User not found or blocked'));
    }

    callback(null, results);
  });
};