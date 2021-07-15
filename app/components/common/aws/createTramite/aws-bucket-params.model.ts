export interface AWSBucketParamsModel {
    Bucket: string,
    Body: Buffer,
    Key: string,
    ContentType: string,
    ACL:string 
};