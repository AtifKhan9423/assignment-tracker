const express = require('express');
const router = express.Router();
const Assignment = require('../models/assignment'); 


router.get('/', (req, res) => {
  Assignment.find()
    .then(assignments => res.render('assignments/index', { assignments }))
    .catch(err => res.status(500).send('Error fetching assignments'));
});


router.post('/', (req, res) => {
  const newAssignment = new Assignment({
    title: req.body.title,
    description: req.body.description,
  });

  newAssignment.save()
    .then(() => res.redirect('/assignments'))
    .catch(err => res.status(500).send('Error saving assignment'));
});



module.exports = router;
