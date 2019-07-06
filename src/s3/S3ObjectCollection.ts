import { S3Object } from "./S3Object";
import { ApiNodeCollection } from "../node/ApiNodeCollection";
import { ApiNodeFactory } from '../node/ApiNodeFactory';
import { S3Bucket } from "./S3Bucket";
import { ApiNode } from "../node/ApiNode";
import { AwsApi } from '../awsapi/AwsApi';

export class S3ObjectCollection extends ApiNodeCollection<S3Object, AWS.S3.Object> {
  s3Bucket: S3Bucket;

  constructor(parent: ApiNode, s3Bucket: S3Bucket) {
    super(parent);
    this.s3Bucket = s3Bucket;
  }

  apiNodeFromAwsData(awsData: AWS.S3.Object) {
    return ApiNodeFactory.s3Object(this, this.s3Bucket, awsData.Key);
  }

  apiNodeFromId(id: string) {
    return ApiNodeFactory.s3Object(this, this.s3Bucket, id);
  }

  async load(): Promise<AWS.S3.Object[]> {
    return AwsApi.s3.listObjects(this.s3Bucket.name);
  }
}