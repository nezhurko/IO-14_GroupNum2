import { connectDB } from '../config/db.js';
import { handleDBError, handleDBResults, checkUserBlocked } from '../utils/dbUtils.js';

export const viewData = (req, res) => {
  const db = connectDB();
  const query = 'SELECT * FROM Data WHERE blocked = 0';
  db.query(query, (error, results) => {
    if (error) {
      return handleDBError(res, error);
    }

    results.forEach(row => {
      if (row.content) {
        row.content = row.content.toString();
      }
    });

    handleDBResults(res, results);
  });
};

export const generateTable = (req, res) => {
  const db = connectDB();
  const { userId, tableName, columns } = req.body;

  checkUserBlocked(userId, (error, results) => {
    if (error) {
      return handleDBError(res, error);
    }

    const createTableQuery = `CREATE TABLE IF NOT EXISTS ${tableName} (id INT NOT NULL AUTO_INCREMENT, ${columns}, PRIMARY KEY (id))`;
    db.query(createTableQuery, (tableError) => {
      if (tableError) {
        return handleDBError(res, tableError);
      }

      const selectTableQuery = `SELECT * FROM ${tableName}`;
      db.query(selectTableQuery, (selectError, selectResults) => {
        if (selectError) {
          return handleDBError(res, selectError);
        }

        handleDBResults(res, {
          message: `Table ${tableName} created successfully.`,
          data: selectResults
        });
      });
    });
  });
};

export const addData = (req, res) => {
  const db = connectDB();
  const { userId, tableName, data } = req.body;
  const forbiddenTables = ['User', 'Role', 'Permission', 'Role_has_Permission', 'Category', 'Data', 'ChangeData'];

  if (!userId) {
    return res.status(401).send({ message: 'Not Authorized' });
  }

  checkUserBlocked(userId, (error, results) => {
    if (error) {
      return handleDBError(res, error);
    }

    if (forbiddenTables.includes(tableName)) {
      return res.status(403).send({ message: 'Modification of this table is not allowed.' });
    }

    const checkQuery = `SELECT * FROM ${tableName} WHERE ?`;
    db.query(checkQuery, { id: data.id }, (checkError, checkResults) => {
      if (checkError) {
        return handleDBError(res, checkError);
      }

      if (checkResults.length > 0) {
        return res.status(400).send({ message: 'Data already exists in the table.' });
      }

      const insertQuery = `INSERT INTO ${tableName} SET ?`;
      db.query(insertQuery, data, (insertError) => {
        if (insertError) {
          return handleDBError(res, insertError);
        }

        const selectQuery = `SELECT * FROM ${tableName}`;
        db.query(selectQuery, (selectError, selectResults) => {
          if (selectError) {
            return handleDBError(res, selectError);
          }

          handleDBResults(res, {
            message: `${tableName} data added successfully.`,
            tableData: selectResults
          });
        });
      });
    });
  });
};

export const updateData = (req, res) => {
  const db = connectDB();
  const { userId, tableName, dataId, data } = req.body;
  const forbiddenTables = ['User', 'Role', 'Permission', 'Role_has_Permission', 'Category', 'Data', 'ChangeData'];

  if (!userId) {
    return res.status(401).send({ message: 'NOT_AUTHORIZED' });
  }

  checkUserBlocked(userId, (error, results) => {
    if (error) {
      return handleDBError(res, error);
    }

    if (forbiddenTables.includes(tableName)) {
      return res.status(403).send({ message: 'Modification of this table is not allowed.' });
    }

    const checkQuery = `SELECT * FROM ${tableName} WHERE id = ?`;
    db.query(checkQuery, [dataId], (checkError, checkResults) => {
      if (checkError) {
        return handleDBError(res, checkError);
      }

      if (checkResults.length === 0) {
        return res.status(400).send({ message: 'Data does not exist in the table.' });
      }

      const updateQuery = `UPDATE ${tableName} SET ? WHERE id = ?`;
      db.query(updateQuery, [data, dataId], (updateError) => {
        if (updateError) {
          return handleDBError(res, updateError);
        }

        const selectQuery = `SELECT * FROM ${tableName}`;
        db.query(selectQuery, (selectError, selectResults) => {
          if (selectError) {
            return handleDBError(res, selectError);
          }

          handleDBResults(res, {
            message: `${tableName} data updated successfully.`,
            tableData: selectResults
          });
        });
      });
    });
  });
};

export const deleteData = (req, res) => {
  const db = connectDB();
  const { userId, tableName, dataId } = req.body;

  if (!userId) {
    return res.status(401).send({ message: 'Not Authorized' });
  }

  checkUserBlocked(userId, (error, results) => {
    if (error) {
      return handleDBError(res, error);
    }

    const deleteQuery = `DELETE FROM ${tableName} WHERE id = ?`;
    db.query(deleteQuery, dataId, (deleteError) => {
      if (deleteError) {
        return handleDBError(res, deleteError);
      }

      const selectQuery = `SELECT * FROM ${tableName}`;
      db.query(selectQuery, (selectError, selectResults) => {
        if (selectError) {
          return handleDBError(res, selectError);
        }

        handleDBResults(res, {
          message: `${tableName} data deleted successfully.`,
          tableData: selectResults
        });
      });
    });
  });
};