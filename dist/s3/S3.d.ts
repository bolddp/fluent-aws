import { S3Bucket } from './S3Bucket';
import { S3 as AwsS3 } from '@aws-sdk/client-s3';
import { ApiNode } from '../node/ApiNode';
import { S3BucketCollection } from './S3BucketCollection';
export declare class S3 extends ApiNode {
    bucketCollection: S3BucketCollection;
    constructor(parent: ApiNode);
    buckets(): S3BucketCollection;
    bucket(name: string): S3Bucket;
    client(): Promise<AwsS3>;
}
