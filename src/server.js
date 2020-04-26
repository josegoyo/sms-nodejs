const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const app = express();

// settings
app.set('port', 4000 || process.env.PORT);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    defaultLayout: 'main',
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

// middlewares

//routes
app.use(require('./routes/index.routes'));

// static files

module.exports = app;