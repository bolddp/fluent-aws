import { ApiNodeCollection } from '../node/ApiNodeCollection';
import { S3Bucket } from './S3Bucket';
import { ApiNodeFactory } from '../node/ApiNodeFactory';
import { AwsApi } from '../awsapi/AwsApi';
import { Bucket } from '@aws-sdk/client-s3';

export class S3BucketCollection extends ApiNodeCollection<S3Bucket, Bucket> {
  apiNodeFromAwsData(data: Bucket) {
    return ApiNodeFactory.s3Bucket(this, data.Name);
  }

  apiNodeFromId(id: string) {
    return ApiNodeFactory.s3Bucket(this, id);
  }

  async load(): Promise<Bucket[]> {
    return await AwsApi.s3(this.config()).listBuckets();
  }
}
