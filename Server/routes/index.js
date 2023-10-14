const express = require('express');
const router = express.Router();
const db = require('../Database/Database');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const moment = require('moment');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images')
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({ storage: storage });

// Add tasks
router.post('/add', upload.single('image'), (req, res) => {
  try {
    console.log(req.body);
    const { heading, description, priority } = req.body;
    const image = req.file.filename;
    const date = moment().format('YYYY-MM-DD');
    const time = moment().format('HH:mm:ss');

    const imageBuffer = fs.readFileSync(`public/images/${image}`);
    const base64Image = imageBuffer.toString('base64');

    const sql = 'INSERT INTO Tasks (heading, description, priority, image, date, time) VALUES (?, ?, ?, ?, ?, ?)';

    db.getConnection().query(sql, [heading, description, priority, base64Image, date, time], (err, results) => {
      if (err) {
        console.error('Error inserting data: ' + err);
        res.status(500).json({ message: 'Error inserting data' });
      } else {
        res.json({ message: 'Data inserted successfully' });
      }
    });
  } catch (error) {
    console.log(error);
  }
});


// Get all tasks
router.get('/tasks', (req, res) => {
  try {
    const tasks = 'SELECT * FROM Tasks';
    db.getConnection().query(tasks, (err, results) => {
      if (err) {
        console.error('Error retrieving tasks: ' + err);
        res.status(500).json({ message: 'Error retrieving tasks' });
      } else {
        res.status(200).json(results);
      }
    });
  } catch (error) {
    console.log(error);
  }
});


// Specified task
router.get('/task', (req, res) => {
  try {
    const id = req.query._id
    const sql = `SELECT * FROM Tasks WHERE _id = ${id}`;

    db.getConnection().query(sql, (err, results) => {
      if (err) {
        console.error('Error retrieving tasks: ' + err);
        res.status(500).json({ message: 'Error retrieving tasks' });
      } else {
        res.json(results);
      }
    });

  } catch (error) {
console.log(error);
  }
});



// Edit tasks
router.put('/edit', upload.single('image'), (req, res) => {
  try {
    const { _id, heading, description, priority, date, time } = req.body;
    let base64Image = null; // Initialize with null

    if (req.file) {
      const image = req.file.filename;
      const imageBuffer = fs.readFileSync(`public/images/${image}`);
      base64Image = imageBuffer.toString('base64');
    }

    const update = `UPDATE Tasks SET heading = ?, description = ?, priority = ?, date = ?, time = ? ${base64Image ? ', image = ?' : ''} WHERE _id = ?`;

    const updateParams = [heading, description, priority, date, time];

    if (base64Image) {
      updateParams.push(base64Image); // Add image data to the parameters if a new image is provided
    }

    updateParams.push(_id); // Add task ID to the parameters

    db.getConnection().query(update, updateParams, (err, results) => {
      if (err) {
        console.error('Error updating task: ' + err);
        res.status(500).json({ message: 'Error updating task' });
      } else {
        res.json(results);
      }
    });
  } catch (err) {
    console.log(err);
  }
});




// Delete tasks
router.delete('/delete', (req, res) => {
  try {
    const id = req.query._id;
    if (!id || isNaN(id) || id <= 0) {
      res.status(400).json({ message: 'Invalid task ID' });
      return;
  }

  const del = `DELETE FROM Tasks WHERE _id = ${id}`;

  db.getConnection().query(del, [id], (err, results) => {
    if (err) {
      console.error('Error deleting task: ' + err);
      res.status(500).json({ message: 'Error deleting task' });
    } else {
      res.json({ message: 'Task deleted successfully' });
    }
  });
  
  } catch (error) {
    console.log(error);
  }
});


module.exports = router;
