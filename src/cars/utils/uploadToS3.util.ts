import * as AWS from 'aws-sdk';

export async function uploadToS3(file, folderName, s3Service: AWS.S3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
})) {
    try {
        const upFileParams = {
        Bucket: process.env.AWS_BUCKET_NAME + folderName,
        Key: Date.now().toString() + "-" + file.originalname,
        Body: file.buffer,
        ACL: "public-read",
        };

        return new Promise((resolve, reject) => {
            s3Service.upload(upFileParams, (error, data) => {
            if (error) {
                reject(error);
            } else {
                resolve(data.Location);
            }
            });
        });
    } catch (error) {
        console.error(`Erro ao fazer upload da imagem: ${error}`);
        throw error;
    }
}
