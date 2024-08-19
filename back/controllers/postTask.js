const database = require('../database/database');
const { v4: uuidv4 } = require('uuid');

exports.postTask = async (req, res) => {
  const _id = uuidv4();

  const { title, description, date, isCompleted, isImportant, userId } = req.body;
  // console.log(title, description, date, isCompleted, isImportant, userId);

  try {
    await database.query(
      'insert into task (_id, title, description, date, isCompleted, isImportant, userId) values ($1, $2, $3, $4, $5, $6, $7)',
      [_id, title, description, date, isCompleted, isImportant, userId]
    );

    return res.status(201).json({ message: 'Task Created Successfully' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
