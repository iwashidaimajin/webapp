const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
app.get('/about', (req, res) => {
  res.send('About Page');
});

app.get('/contact', (req, res) => {
  res.send('Contact Page');
});
app.use(express.static('public'));
app.use(express.json());
app.set('view engine', 'ejs');

app.get('/user/:name', (req, res) => {
  res.render('user', { name: req.params.name });
});
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));
  const userSchema = new mongoose.Schema({
    name: String,
    email: String,
  });
  
  const User = mongoose.model('User', userSchema);
  
  app.post('/users', async (req, res) => {
    const user = new User(req.body);
    try {
      await user.save();
      res.status(201).send(user);
    } catch (e) {
      res.status(400).send(e);
    }
  });