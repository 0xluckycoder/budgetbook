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
    origin: ["http://localhost:3000", "http://budgetbook-app.s3-website.ap-south-1.amazonaws.com"],
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

app.use('/api/v1/expenses', expenseRoutes);
app.use('/api/v1/incomes', incomeRoutes);
app.use('/api/v1/accounts', accountRoutes);
app.use('/api/v1/auth', authRoutes);

// app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

app.listen(5500, () => {
    console.log('Listening at port 5500');
});