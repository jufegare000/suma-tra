import { AWSBucketParamsModel } from "./aws-bucket-params.model";
import { AWSConfig } from "../../../../config/aws/aws.config";
import AWS from 'aws-sdk';


export class UploadFilesToS3Service {
    async uploadImageToS3(params: AWSBucketParamsModel): Promise<string> {
        AWSConfig.getInstance();
        const s3 = new AWS.S3();
        try {
            const data: AWS.S3.ManagedUpload.SendData = await s3.upload(params).promise();
            return data.Location;

        } catch (error) {
            throw new Error(`There was an error while uploading s3 bucket ${error}`)
        }
    }

}