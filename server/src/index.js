const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const moment = require('moment');

require('dotenv').config();

const middlewares = require('./middlewares');

const expenseRoutes = require('./v1/api/expenseRoutes');
const incomeRoutes = require('./v1/api/incomeRoutes');
const accountRoutes = require('./v1/api/accountRoutes');
const authRoutes = require('./v1/api/authRoutes');

const app = express();

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.8lfm4rb.mongodb.net/?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error ❌: "));
db.once("open", () => {
    console.log("connected successfully");
});

app.use(morgan('common'));

// config with only allowed origins
app.use(cors({
    origin: "http://localhost:3000",
    // origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use(express.json());

app.use(cookieParser());

app.get('/', (req, res) => {
    res.json({
        message: 'api root 🦉',
    });

    // throw new Error('wrong');
});

// test moment
// console.log(moment().day(0).format('YYYY-MM-DD'));
// console.log(moment().day(0).format('MM'));
// console.log(moment().day(0).format('DD'));

/*
2022-09-18T16:08:16.540+00:00 - DB date foramt
2022-09-18T17:13:38.641Z - moment js date format

const startOfMonth = moment().startOf('month').format('YYYY-MM-DD hh:mm');
const endOfMonth   = moment().endOf('month').format('YYYY-MM-DD hh:mm');
*/ 

console.log(moment().day(0).format('YYYY-MM-DD'))

app.use('/api/v1/expense', expenseRoutes);
app.use('/api/v1/income', incomeRoutes);
app.use('/api/v1/account', accountRoutes);
app.use('/api/v1/auth', authRoutes);

// app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

app.listen(5500, () => {
    console.log('Listening at port 5500');
});