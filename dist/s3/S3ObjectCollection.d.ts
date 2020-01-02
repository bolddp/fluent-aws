import { S3Object } from "./S3Object";
import { ApiNodeCollection } from "../node/ApiNodeCollection";
import { ApiNode } from "../node/ApiNode";
export declare class S3ObjectCollection extends ApiNodeCollection<S3Object, AWS.S3.Object> {
    bucketName: string;
    constructor(parent: ApiNode, bucketName: string);
    apiNodeFromAwsData(awsData: AWS.S3.Object): S3Object;
    apiNodeFromId(id: string): S3Object;
    load(): Promise<AWS.S3.Object[]>;
}
