import { AWSBucketPathModel } from "../../../components/common/aws/createTramite/aws-bucket-path.model";
import { USER_MOCK } from "./user-dummy.mock";

export const bucketPathModelForJPEGMOCK: AWSBucketPathModel = {
    extension: 'jpeg',
    fileName: 'proof',
    tramiteId: "0",
    userUploader: USER_MOCK
}