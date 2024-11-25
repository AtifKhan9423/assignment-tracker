const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;


app.set('view engine', 'ejs');


app.set('views', 'views');


app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));


mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));


const assignmentRoutes = require('./routes/assignments');
app.use('/assignments', assignmentRoutes);

app.get('/', (req, res) => {
  res.render('pages/home');
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

