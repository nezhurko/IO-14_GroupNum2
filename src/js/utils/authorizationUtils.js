import { connectDB } from '../config/db.js';

export const isAdmin = (userId, callback) => {
  const db = connectDB();
  const adminQuery = 'SELECT * FROM User WHERE id = ? AND UserRole_ManyToOne_id_role = 1';
  db.query(adminQuery, userId, (error, results) => {
    if (error) {
      return callback(error);
    }

    if (results.length === 0) {
      return callback(new Error('Only admin can perform this action'));
    }

    callback(null, results);
  });
};