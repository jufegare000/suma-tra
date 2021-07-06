import AWS from 'aws-sdk';
import * as dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

const accessID: any = process.env.AWS_KEY;
const accessKey: any = process.env.AWS_ACCESS;
const token: any = process.env.AWS_TOKEN;
const bucketName: any = process.env.BUCKET_NAME

AWS.config.update({
    accessKeyId:accessID,
    secretAccessKey:accessKey,
    sessionToken: token
})

const s3 = new AWS.S3();
const filePath = './data/file.txt'

const params = {
    Bucket: bucketName,
    Body: fs.createReadStream(filePath),
    Key: 'folder/'+Date.now()+"-"+path.basename(filePath)
}

export default s3.upload(params, function(err: any, data: any) {
    if(err){
        console.log(err);
    }
    if(data){
        console.log("uploaded in: ", data.Location);
    }
})