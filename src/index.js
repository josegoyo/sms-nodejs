require('dotenv').config()
const app = require('./server');
require('./database');

app.listen(app.get('port'), () => {
    console.log(`server running on port ${app.get('port')}`);
})