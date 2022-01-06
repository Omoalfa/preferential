const express = require('express');
const env = require('dotenv');
const bodyPaser = require('body-parser');
const cors = require('cors');
const { PORT, DB_URI } = require('./config');
const apis = require('./routes');
const mongoose = require('mongoose');


env.config()

const app = express();


app.use(cors());
app.use(bodyPaser.json())
app.use(bodyPaser.urlencoded({ extended: false }))

app.use('/api/v1/users', apis)

app.get('/', (req, res) => {
    return res.send('Welcome on board!')
})

mongoose.connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", () => {
console.log("connected to db successfully");
});

app.listen(PORT, () => {
    console.log('Express server listening on port ' + PORT)
})