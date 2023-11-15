import { S3Bucket } from './S3Bucket';
import { S3 as AwsS3 } from '@aws-sdk/client-s3';
import { ApiNode } from '../node/ApiNode';
import { S3BucketCollection } from './S3BucketCollection';
import { ApiNodeFactory } from '../node/ApiNodeFactory';
import { AwsApi } from '../awsapi/AwsApi';

export class S3 extends ApiNode {
  bucketCollection: S3BucketCollection;

  constructor(parent: ApiNode) {
    super(parent);
    this.bucketCollection = ApiNodeFactory.s3BucketCollection(this);
  }

  buckets(): S3BucketCollection {
    return this.bucketCollection;
  }

  bucket(name: string): S3Bucket {
    return this.bucketCollection.getById(name);
  }

  async client(): Promise<AwsS3> {
    await this.ensureResolved();
    return AwsApi.s3(this.config()).getClient();
  }
}
