const { 
    S3Client,
    DeleteObjectsCommand
} = require('@aws-sdk/client-s3');

module.exports = deleteObjects = async (urls) => {
    try {

        // format request object to expected format
        const formattedObject = urls.map(urlItem => {
            const splittedArray = urlItem.split('/');
            const objectName = splittedArray[splittedArray.length - 1];
            return {
                Key: objectName
            }
        });

        // config
        const client = new S3Client({
            region: process.env.AWS_REGION,
            credentials : {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
            },
        });

        // batch delete objects from s3
        const deleteObjectsCommand = new DeleteObjectsCommand({
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Delete: {
                Objects: formattedObject
            }
        });
        
        const deleteObjectsResponse = await client.send(deleteObjectsCommand);
        return deleteObjectsResponse;
    } catch (error) {
        throw error;
    }
}


// const deleteObjectsCommand = new DeleteObjectsCommand({
//     Bucket: process.env.AWS_S3_BUCKET_NAME,
//     Delete: {
//         Objects: [{
//             Key: 'example-delete-1-e3b8ecd2-4359-48ac-b37d-4a9d5d580de6.webp'
//         },
//         {
//             Key: 'example-delete-2-e3b8ecd2-4359-48ac-b37d-4a9d5d580de6.webp'
//         }]
//     }
// });