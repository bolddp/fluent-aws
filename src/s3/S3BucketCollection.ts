import { ApiNodeCollection } from '../node/ApiNodeCollection';
import { S3Bucket } from './S3Bucket';
import { ApiNodeFactory } from '../node/ApiNodeFactory';
import { AwsApi } from '../awsapi/AwsApi';

export class S3BucketCollection extends ApiNodeCollection<S3Bucket, AWS.S3.Bucket> {
  apiNodeFromAwsData(data: AWS.S3.Bucket) {
    return ApiNodeFactory.s3Bucket(this, data.Name);
  }

  apiNodeFromId(id: string) {
    return ApiNodeFactory.s3Bucket(this, id);
  }

  async load(): Promise<AWS.S3.Bucket[]> {
    return await AwsApi.s3.listBuckets();
  }
}