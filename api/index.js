const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoute = require('./routes/auth');
const movieRoute = require('./routes/movies');
const userRoute = require('./routes/users');
const listRoute = require('./routes/lists');

dotenv.config();

main().catch((err) => console.log(err));

async function main() {
    await mongoose
        .connect(process.env.MONGO_URL)
        .then(() => console.log('Mongo Connection Succsess'))
        .catch((err) => console.log(err));
}

app.use(express.static('build'));

app.use(express.json());
app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/movies', movieRoute);
app.use('/api/lists', listRoute);

app.listen(8800, () => {
    console.log('Server is running!');
});
