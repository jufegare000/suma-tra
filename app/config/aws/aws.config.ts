import AWS from 'aws-sdk';
import fs from 'fs';
import path from 'path';

export class AWSConfig {
    private static instance: AWSConfig;

    accessID: any = process.env.AWS_KEY;
    accessKey: any = process.env.AWS_ACCESS;
    bucketName: any = process.env.BUCKET_NAME


    private constructor() { }

    public static getInstance(): AWSConfig {
        if (!AWSConfig.instance) {
            AWSConfig.instance = new AWSConfig();
            AWSConfig.instance.setConfigurations();
        }
        return AWSConfig.instance;
    }

    public setConfigurations():void {
        AWS.config.setPromisesDependency(require('bluebird'));
        AWS.config.update({
            accessKeyId: this.accessID,
            secretAccessKey: this.accessKey,
        });
        
    }
}