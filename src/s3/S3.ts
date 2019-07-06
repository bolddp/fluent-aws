import { S3Bucket } from './S3Bucket';
import { ApiNode } from '../node/ApiNode';
import { S3BucketCollection } from './S3BucketCollection';
import { ApiNodeFactory } from '../node/ApiNodeFactory';

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

  async resolve(): Promise<S3> {
    await this.resolveNode();
    return this;
  }
}