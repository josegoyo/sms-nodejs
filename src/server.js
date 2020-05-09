const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require("body-parser");

const app = express();

// settings
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('port', 4000 || process.env.PORT);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    defaultLayout: 'main',
    extname: '.hbs',
    helpers: require('./libs/handlebars.js')
}));
app.set('view engine', '.hbs');

// middlewares
app.use(morgan('dev'));
// view routes
app.use(require('./routes/views.routes'));
// api routes 
app.use(require('./routes/api.routes'))
// static files
app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;