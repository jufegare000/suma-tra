import { assert } from "chai";
import { AWSBucketParamsModel } from "../../components/common/aws/createTramite/aws-bucket-params.model";
// import { S3ParamsBuilder } from "../../components/common/aws/createTramite/s3-params-builder.aws";
import { UploadFilesToS3Service } from "../../components/common/aws/createTramite/upload-files-s3.service";
import { UploadFilesForTramiteCreation } from "../../components/common/aws/createTramite/uploadFiles.aws";
import { BASE64_FILE } from "./mock/base64File.mock";
import { PDF_BASE_64 } from "./mock/pdfBase64.mock";
import { bucketPathModelForJPEGMOCK } from "./mock/s3-path-params.mock";
import { USER_MOCK } from "./mock/user-dummy.mock";


describe('AWS S3 bucket testing', function () {

  // const s3ParamsBuilder: S3ParamsBuilder = new S3ParamsBuilder()
  const s3Service: UploadFilesToS3Service = new UploadFilesToS3Service();
  const uploadFilesForTramiteCreation: UploadFilesForTramiteCreation = new UploadFilesForTramiteCreation()
  
  it('send a pdf file', async function () {

    const contetTypeFile: string = 'application/pdf';

    const bufferFile: Buffer = uploadFilesForTramiteCreation.parseToBufferFromBase64(PDF_BASE_64);
    const pathForUpload: string = uploadFilesForTramiteCreation.buildUploadPath(USER_MOCK, "1", "cedula")
    const uploadParams: AWSBucketParamsModel = uploadFilesForTramiteCreation.buildParamsForS3Request(bufferFile, 'application/pdf', pathForUpload)
    const objectLocation = await uploadFilesForTramiteCreation.uploadImageToS3(uploadParams)
    console.info(objectLocation)
    assert(objectLocation.length > 0, 'Must be a non empty string');
 
  });

  it.only('send a jpeg image', async function () {

    const contetTypeFile: string = "image/jpeg";

    const bufferFile: Buffer = uploadFilesForTramiteCreation.parseToBufferFromBase64(BASE64_FILE);
    const pathForUpload: string = uploadFilesForTramiteCreation.buildUploadPath(USER_MOCK, "1", "cedula");
    const uploadParams: AWSBucketParamsModel = uploadFilesForTramiteCreation.buildParamsForS3Request(bufferFile, contetTypeFile, pathForUpload)
    const objectLocation = await uploadFilesForTramiteCreation.uploadImageToS3(uploadParams)
    console.info(objectLocation)
    assert(objectLocation.length > 0, 'Must be a non empty string');
  });
});
