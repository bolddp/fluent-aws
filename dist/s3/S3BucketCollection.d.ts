import { ApiNodeCollection } from '../node/ApiNodeCollection';
import { S3Bucket } from './S3Bucket';
export declare class S3BucketCollection extends ApiNodeCollection<S3Bucket, AWS.S3.Bucket> {
    apiNodeFromAwsData(data: AWS.S3.Bucket): S3Bucket;
    apiNodeFromId(id: string): S3Bucket;
    load(): Promise<AWS.S3.Bucket[]>;
}
