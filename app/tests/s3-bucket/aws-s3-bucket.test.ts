import { assert } from "chai";
import { AWSBucketParamsModel } from "../../components/common/aws/createTramite/aws-bucket-params.model";
// import { S3ParamsBuilder } from "../../components/common/aws/createTramite/s3-params-builder.aws";
import { UploadFilesToS3Service } from "../../components/common/aws/createTramite/upload-files-s3.service";
import { BASE64_FILE } from "./mock/base64File.mock";
import { bucketPathModelForJPEGMOCK } from "./mock/s3-path-params.mock";


describe('AWS S3 bucket testing', function () {

  // const s3ParamsBuilder: S3ParamsBuilder = new S3ParamsBuilder()
  const s3Service: UploadFilesToS3Service = new UploadFilesToS3Service();
  
  it.only('Ensure build request correctly', async function () {
    // const filePath: string = s3ParamsBuilder.buildUploadPath(bucketPathModelForJPEGMOCK);
    // const bufferFile: Buffer = s3ParamsBuilder.parseToBufferFromBase64(BASE64_FILE)
    const contetTypeFile: string = "image/jpeg";
    // const paramsForUpload: AWSBucketParamsModel = s3ParamsBuilder.buildParamsForS3Request(bufferFile, contetTypeFile, filePath);
    // const fileDestination: string = await s3Service.uploadImageToS3(paramsForUpload);
    // console.log(fileDestination);
  });
});
