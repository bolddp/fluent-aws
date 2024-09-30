/// <reference types="node" />
import { Readable } from 'stream';
import { FluentAwsConfig } from '../FluentAwsConfig';
import { Bucket, GetObjectOutput, ObjectCannedACL, S3, _Object } from '@aws-sdk/client-s3';
export declare class S3Api {
    private config;
    private s3;
    constructor(config: FluentAwsConfig);
    getClient(): S3;
    headBucket(bucketName: string): Promise<void>;
    createBucket(bucketName: string): Promise<void>;
    listObjects(bucketName: string, prefix?: string): Promise<_Object[]>;
    listBuckets(): Promise<Bucket[]>;
    headObject(bucketName: string, key: string): Promise<void>;
    getObject(bucketName: string, key: string): Promise<GetObjectOutput>;
    getObjectStream(bucketName: string, key: string): Promise<ReadableStream>;
    deleteObject(bucketName: string, key: string): Promise<void>;
    upload(bucketName: string, key: string, body: Readable, contentType: string): Promise<void>;
    putObject(bucketName: string, key: string, body: Readable): Promise<void>;
    copyObject(sourceBucket: string, sourceKey: string, targetBucket: string, targetKey: string, acl?: ObjectCannedACL): Promise<void>;
    getSignedUrl(operation: string, bucket: string, key: string): Promise<string>;
}
