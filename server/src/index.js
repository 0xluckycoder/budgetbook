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

console.log(moment().day(0).format('YYYY-MM-DD'));

/* testing */ 

const { 
    S3Client,
    DeleteObjectsCommand
} = require('@aws-sdk/client-s3');

app.get('/api/v1/test', async (req, res, next) => {
    const client = new S3Client({
        region: process.env.AWS_REGION,
        credentials : {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
        },
    });
    const deleteObjectsCommand = new DeleteObjectsCommand({
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Delete: {
            Objects: [{
                Key: 'example-delete-1-e3b8ecd2-4359-48ac-b37d-4a9d5d580de6.webp'
            },
            {
                Key: 'example-delete-2-e3b8ecd2-4359-48ac-b37d-4a9d5d580de6.webp'
            }]
        }
    });
    const deleteObjectsResponse = await client.send(deleteObjectsCommand);
    console.log('deleted', deleteObjectsResponse);
    res.status(200).json({
        message: "cat 😎"
    });
});

/* testing end */ 

app.use('/api/v1/expenses', expenseRoutes);
app.use('/api/v1/incomes', incomeRoutes);
app.use('/api/v1/accounts', accountRoutes);
app.use('/api/v1/auth', authRoutes);

// app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

app.listen(5500, () => {
    console.log('Listening at port 5500');
});