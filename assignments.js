const express = require('express');
const router = express.Router();
const Assignment = require('../models/assignment');

// GET /assignments
router.get('/', (req, res) => {
  console.log('Fetching assignments...');

  Assignment.find()
    .then(assignments => {
      console.log('Assignments fetched:', assignments);  // Log fetched assignments
      // Ensure the path corresponds to your views directory structure
      res.render('assignments/index', { assignments });  // Use assignments/index.ejs
    })
    .catch(err => {
      console.error('Error fetching assignments:', err);  // Detailed error log
      res.status(500).send('Error fetching assignments');
    });
});

// POST /assignments
router.post('/', (req, res) => {
  console.log('Saving new assignment...');
  
  const newAssignment = new Assignment({
    title: req.body.title,
    description: req.body.description,
  });

  newAssignment.save()
    .then(() => {
      console.log('Assignment saved');  
      res.redirect('/assignments');
    })
    .catch(err => {
      console.error('Error saving assignment:', err);  
      res.status(500).send('Error saving assignment');
    });
});

module.exports = router;
