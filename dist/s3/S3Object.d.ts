import { ApiNode } from '../node/ApiNode';
import { AwsDataApiNode } from '../node/AwsDataApiNode';
import { GetObjectOutput, ObjectCannedACL } from '@aws-sdk/client-s3';
export declare class S3Object extends AwsDataApiNode<GetObjectOutput> {
    bucketName: string;
    key: string;
    constructor(parent: ApiNode, bucketName: string, key: string);
    loadAwsData(): Promise<GetObjectOutput>;
    /**
     * Indicates whether the bucket exists or not.
     */
    exists(): Promise<boolean>;
    delete(): Promise<void>;
    writeS3Object(s3Object: S3Object, acl?: ObjectCannedACL): Promise<S3Object>;
    writeString(contents: string): Promise<void>;
    readString(): Promise<string>;
    readStream(): Promise<ReadableStream>;
}
