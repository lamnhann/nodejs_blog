const path = require('path');
const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const app = express();
const port = 3000;

// Set Static file
app.use(express.static(path.join(__dirname, 'public')));

// HTTP logger
app.use(morgan('combined'));

// Templates engine
app.engine('hbs', handlebars({
  extname: '.hbs'
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resouces/views'));

app.get('/', (req, res) => {
  res.render('home')
});

app.get('/news', (req, res) => {
  console.log(req.query.q);
  res.render('news')
});

app.get('/search', (req, res) => {
  // Dung de goi param sau path
  // console.log(req.query.ref);

  res.render('search');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});