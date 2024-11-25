const express = require('express');
const router = express.Router();
const Assignment = require('../models/assignment');


router.get('/', (req, res) => {
  Assignment.find()
    .then(assignments => {
      console.log(assignments);  
      res.render('partials/index', { assignments });  
    })
    .catch(err => {
      console.error('Error fetching assignments:', err);  
      res.status(500).send('Error fetching assignments');
    });
});


router.post('/', (req, res) => {
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



