const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

require('dotenv').config();

const middlewares = require('./middlewares');

// const authRoutes = require('./v1/api/authRoutes');
// const vendorRoutes = require('./v1/api/vendorRoutes');
// const storeRoutes = require('./v1/api/storeRoutes');

const expenseRoutes = require('./v1/api/expenseRoutes');

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

app.use('/api/v1/expense', expenseRoutes);
// app.use('/api/v1/auth', authRoutes);
// app.use('/api/v1/vendor', vendorRoutes);
// app.use('/api/v1/store', storeRoutes)
// app.use('/api/v1/vendor', authorize, vendorRoutes);

// app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

app.listen(5500, () => {
    console.log('Listening at port 5500');
});