const mongoose = require('mongoose');

const uri = process.env.URI_MONGO;

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(db => console.log('atlas mongodb is connected'))
    .catch(err => console.log(err));