import { AWSConfig } from "../../../../config/aws/aws.config";
import AWS from 'aws-sdk';
import { UserI } from "../../../users/model/interfaces/tramiUser.interface";
import { AWSBucketParamsModel } from "./aws-bucket-params.model";
import { AWS_CONSTANTS } from "./aws-constants";

export class UploadFilesForTramiteCreation {

    bucketName: any = process.env.BUCKET_NAME

    async uploadImageToS3(base64File: string, userUploader: UserI, tramiteId: string, fileName: string) {
        AWSConfig.getInstance();
        const s3 = new AWS.S3();
        const bufferFile: Buffer = this.parseToBufferFromBase64(base64File);
        const { role, email } = userUploader;
        const pathForUpload: string = role + '/' + email + "/" + "tramite/" + tramiteId +"/" +fileName + ".png"
        const params = {
            Bucket: this.bucketName,
            Body: bufferFile,
            Key: pathForUpload,
            ContentType: 'image/png',
            ACL: 'public-read'
        }
        try {
            const data: AWS.S3.ManagedUpload.SendData = await s3.upload(params).promise();
            return data.Location;

        } catch (error) {
            throw new Error(`There was an error while uploading s3 bucket ${error}`)
        }
    }

    buildUploadPath(userUploader: UserI, tramiteId: string, fileName: string) {
        const { role, email } = userUploader;
        const pathForUpload: string = role + '/' + email + "/" + "tramite/" + tramiteId +"/" +fileName + "." + "png"
        return pathForUpload;
    }

    buildParamsForS3Request(bufferFile: Buffer, contentType: string, uploadPath: string) {//AWSBucketPathModel
        const params: AWSBucketParamsModel = {
            Bucket: this.bucketName,
            Body: bufferFile,
            ACL: AWS_CONSTANTS.ACCESS_DELIMITATOR,
            ContentType: contentType,
            Key: uploadPath
        }

        return params;
    }

    parseToBufferFromBase64(fileStringInBase64: string): Buffer {
        return Buffer.from(fileStringInBase64.replace(/^data:image\/\w+;base64,/, ""), 'base64');
    }

}