import { ApiNodeCollection } from '../node/ApiNodeCollection';
import { S3Bucket } from './S3Bucket';
import { Bucket } from '@aws-sdk/client-s3';
export declare class S3BucketCollection extends ApiNodeCollection<S3Bucket, Bucket> {
    apiNodeFromAwsData(data: Bucket): S3Bucket;
    apiNodeFromId(id: string): S3Bucket;
    load(): Promise<Bucket[]>;
}
