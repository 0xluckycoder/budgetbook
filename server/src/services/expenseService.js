const expense = require('../database/expense');
const moment = require('moment');

const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
const { 
    S3Client, 
    PutObjectCommand
} = require('@aws-sdk/client-s3');
const { v4: uuidv4 } = require('uuid');
const customError = require('../utils/customError');


const createExpense = async (expenseData) => {
    try {
        // add transaction date in ISO format
        // expenseData.transactionDate = moment().day(0).format('YYYY-MM-DD');
        const createExpense = await expense.createExpense(expenseData);
        return createExpense;
    } catch(error) {
        throw error;
    }
}

const getExpenses = async (sortType) => {
    try {
        const getExpense = await expense.getExpenses(sortType);
        return getExpense;
    } catch(error) {
        throw error;
    }
}

const getExpenseById = async (id) => {
    try {
        const getExpenseById = await expense.getExpenseById(id);
        return getExpenseById;
    } catch (error) {
        throw error;
    }
}

const updateExpense = async (expenseData, id) => {
    try {
        const updateExpense = expense.updateExpense(expenseData, id);
        return updateExpense;
    } catch(error) {
        throw error;
    }
}

const deleteExpense = async (id) => {
    try {
        const deleteExpense = expense.deleteExpense(id);
        return deleteExpense;
    } catch(error) {
        throw error;
    }
}

/*
rewrite this function in a another folder once this needed to used by every single image upload
*/ 
const uploadImage = async (file) => {
    try {
        const supportedFormats = [
            "image/jpeg",
            "image/png"
        ];

        // validate image size
        if (file.size > 1000000) throw customError('invalid file size', 'ValidationFailed')

        // validate image format
        const isSupported = supportedFormats.some(item => item === file.mimetype);
        if (!isSupported) throw customError('invalid file format', 'ValidationFailed');

        const uploadedImagePath = path.resolve(file.path);

        // remove current ext and return filename without ext
        const fileNameArray = file.filename.split('.');
        fileNameArray.pop();
        const fileNameWithoutExt = fileNameArray.join('');

        const uploadDestination = path.resolve('src/images', fileNameWithoutExt);

        // compress & upload image as .webp
        await sharp(uploadedImagePath).webp({ lossless: false }).toFile(`${uploadDestination}.webp`);

        // remove cache uploaded images
        fs.unlinkSync(file.path);

        // generate unique name for the image
        const uniqueFileName = uuidv4();

        // upload image to s3
        const client = new S3Client({
            region: process.env.AWS_REGION,
            credentials : {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
            },
        });
        const fileStream = fs.createReadStream(`${uploadDestination}.webp`);
        const putObjectCommand = new PutObjectCommand({
            Body: fileStream,
            Key: `${uniqueFileName}.webp`,
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            ACL: "public-read"
        });
        const putObjectCommandResponse = await client.send(putObjectCommand);
        console.log('uploaded', putObjectCommandResponse);

        // delete .webp converted image from server
        fs.unlinkSync(`src/images/${fileNameWithoutExt}.webp`);

        const uploadedImageUrl = `https://budgetbook.s3.ap-south-1.amazonaws.com/${uniqueFileName}.webp`;
        return uploadedImageUrl;

    } catch(error) {
        throw error;
    }
}

module.exports = {
    createExpense,
    getExpenses,
    getExpenseById,
    updateExpense,
    deleteExpense,
    uploadImage,
}