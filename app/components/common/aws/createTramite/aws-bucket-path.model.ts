import { UserI } from "../../../users/model/interfaces/tramiUser.interface";

export interface AWSBucketPathModel {
    userUploader: UserI,
    tramiteId: string,
    fileName: string,
    extension: string
}