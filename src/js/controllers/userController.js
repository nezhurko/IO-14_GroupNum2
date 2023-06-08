import { connectDB } from '../config/db.js';
import { handleDBError, handleDBResults } from '../utils/dbUtils.js';
import { isAdmin } from '../utils/authorizationUtils.js';

export const blockUser = (req, res) => {
  const db = connectDB();
  const { userId, blockUserWithId, blockedStatus } = req.body;

  isAdmin(userId, (error, results) => {
    if (error) {
      return handleDBError(res, error);
    }

    const query = 'UPDATE User SET blocked = ? WHERE id = ?';

    db.query(query, [blockedStatus, blockUserWithId], (error) => {
      if (error) {
        return handleDBError(res, error);
      }

      const userQuery = 'SELECT * FROM User WHERE id = ?';
      db.query(userQuery, blockUserWithId, (userError, userResults) => {
        if (userError) {
          return handleDBError(res, userError);
        }

        if (userResults.length === 0) {
          return res.status(404).send({ message: 'User not found' });
        }

        const user = userResults[0];
        handleDBResults(res, {
          message: `User ${user.email} blocked status updated`,
          tableData: userResults
        });
      });
    });
  });
};

export const makeAdmin = (req, res) => {
  const db = connectDB();
  const { userId, updateRoleUserWithId, roleId } = req.body;

  isAdmin(userId, (error, results) => {
    if (error) {
      return handleDBError(res, error);
    }

    const query = 'UPDATE User SET UserRole_ManyToOne_id_role = ? WHERE id = ?';

    db.query(query, [roleId, updateRoleUserWithId], (error) => {
      if (error) {
        return handleDBError(res, error);
      }

      const userQuery = 'SELECT * FROM User WHERE id = ?';
      db.query(userQuery, updateRoleUserWithId, (userError, userResults) => {
        if (userError) {
          return handleDBError(res, userError);
        }

        if (userResults.length === 0) {
          return res.status(404).send({ message: 'User not found' });
        }

        const user = userResults[0];
        handleDBResults(res, {
          message: `User role updated for ${user.email}`,
          tableData: userResults
        });
      });
    });
  });
};