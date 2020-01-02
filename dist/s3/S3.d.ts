import { S3Bucket } from './S3Bucket';
import { ApiNode } from '../node/ApiNode';
import { S3BucketCollection } from './S3BucketCollection';
export declare class S3 extends ApiNode {
    bucketCollection: S3BucketCollection;
    constructor(parent: ApiNode);
    buckets(): S3BucketCollection;
    bucket(name: string): S3Bucket;
}
