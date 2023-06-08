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

export const userRegistration = (req, res) => {
    const db = connectDB();
    const { name, email, password } = req.body;
  
    const checkUserQuery = 'SELECT * FROM User WHERE email = ?';
    db.query(checkUserQuery, email, (checkError, checkResults) => {
      if (checkError) {
        return handleDBError(res, checkError);
      }
  
      if (checkResults.length > 0) {
        return res.status(400).send({ message: 'User already exists' });
      }
  
      const insertQuery = 'INSERT INTO User (id, name, email, password, blocked, UserRole_ManyToOne_id_role) VALUES (?, ?, ?, ?, ?, ?)';
  
      const getMaxIdQuery = 'SELECT MAX(id) AS maxId FROM User';
      db.query(getMaxIdQuery, (maxIdError, maxIdResults) => {
        if (maxIdError) {
          return handleDBError(res, maxIdError);
        }
  
        let newId = 1;
        if (maxIdResults[0].maxId !== null) {
          newId = maxIdResults[0].maxId + 1; 
        }
  
        const roleId = 3; //guest
        const blocked = 0;
  
        db.query(insertQuery, [newId, name, email, password, blocked, roleId], (insertError) => {
          if (insertError) {
            return handleDBError(res, insertError);
          }
  
          const getUserQuery = 'SELECT * FROM User WHERE email = ?';
          db.query(getUserQuery, email, (userError, userResults) => {
            if (userError) {
              return handleDBError(res, userError);
            }
  
            if (userResults.length === 0) {
              return res.status(404).send({ message: 'User not found' });
            }
  
            const user = userResults[0];
            handleDBResults(res, {
              message: 'User registered successfully',
              userData: userResults
            });
          });
        });
      });
    });
  };  

export const userAuthorization = (req, res) => {
  const db = connectDB();
  const { email, password } = req.body;

  const getUserQuery = 'SELECT * FROM User WHERE email = ? AND password = ?';
  db.query(getUserQuery, [email, password], (error, results) => {
    if (error) {
      return handleDBError(res, error);
    }

    if (results.length === 0) {
      return res.status(401).send({ message: 'Invalid email or password' });
    }

    handleDBResults(res, {
      message: 'User authorized successfully',
      userData: results
    });
  });
};