/// <reference types="node" />
import * as AWS from 'aws-sdk';
import { Readable } from "stream";
import { Body } from "aws-sdk/clients/s3";
import { FluentAwsConfig } from '../FluentAwsConfig';
export declare class S3Api {
    config: FluentAwsConfig;
    s3: () => AWS.S3;
    constructor(config: FluentAwsConfig);
    headBucket(bucketName: string): Promise<void>;
    createBucket(bucketName: string): Promise<void>;
    listObjects(bucketName: string, prefix?: string): Promise<AWS.S3.Object[]>;
    listBuckets(): Promise<AWS.S3.Bucket[]>;
    headObject(bucketName: string, key: string): Promise<void>;
    getObject(bucketName: string, key: string): Promise<AWS.S3.GetObjectOutput>;
    getObjectStream(bucketName: string, key: string): Promise<Readable>;
    deleteObject(bucketName: string, key: string): Promise<void>;
    upload(bucketName: string, key: string, body: Body, contentType: string): Promise<void>;
    putObject(bucketName: string, key: string, body: Body): Promise<void>;
    copyObject(sourceBucket: string, sourceKey: string, targetBucket: string, targetKey: string, acl?: string): Promise<void>;
    getSignedUrl(operation: string, bucket: string, key: string): Promise<string>;
}
