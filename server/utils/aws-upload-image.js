
require("dotenv").config({ path: ".env" });
const AWS = require("aws-sdk");

const ID = process.env.AWS_ID;
const SECRET = process.env.AWS_SECRET;
const BUCKET_NAME = process.env.AWS_BUCKET_NAME;

const s3 = new AWS.S3({
    accessKeyId: ID,
    secretAccessKey: SECRET
});

async function awsUploadImage(file, filePath) {
    const params = {
        Bucket: BUCKET_NAME,
        Key: `${filePath}`,
        Body: file
    }

    try {
        const response = await s3.upload(params).promise();
        return response.Location;
    } catch (error) {
        console.log(error);
        throw new Error()
    }
}

async function awsDeleteS3(filePath) {
    
    const sinHttp = filePath.replace(`https://${BUCKET_NAME}.s3.amazonaws.com/`, "");
    const params = {
        Bucket: BUCKET_NAME,
        Key: `${sinHttp}`,
    };
    try {
        await s3.deleteObject(params).promise();
        return true;
    } catch (error) {
        console.log(error);
        throw new Error()
    }
}

module.exports = {
    awsUploadImage,
    awsDeleteS3
};