const path = require('path');
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override')
const handlebars = require('express-handlebars');
const route = require('./routes');
const db = require('./config/db');

// Connect to DB
db.connect();

const app = express();
const port = 3000;

// Use Static file
app.use(express.static(path.join(__dirname, 'public')));

// middlewares(thanh phan trung gian)
app.use(
    express.urlencoded({
        extended: true,
    }),
);

app.use(express.json());

app.use(methodOverride('_method'))

// HTTP logger
app.use(morgan('combined'));

// Templates engine
app.engine(
    'hbs',
    handlebars({
        extname: '.hbs',
        // Specify helpers which are only registered on this instance.
        helpers: {
            sum: (a, b) => a + b,
        },
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resouces', 'views'));

// Routes init
route(app);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
