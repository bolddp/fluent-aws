/// <reference types="node" />
import { ApiNode } from "../node/ApiNode";
import { Readable } from "stream";
import { AwsDataApiNode } from "../node/AwsDataApiNode";
export declare class S3Object extends AwsDataApiNode<AWS.S3.GetObjectOutput> {
    bucketName: string;
    key: string;
    constructor(parent: ApiNode, bucketName: string, key: string);
    loadAwsData(): Promise<import("aws-sdk/clients/s3").GetObjectOutput>;
    /**
     * Indicates whether the bucket exists or not.
     */
    exists(): Promise<boolean>;
    delete(): Promise<void>;
    writeS3Object(s3Object: S3Object): Promise<S3Object>;
    writeString(contents: string): Promise<void>;
    readString(): Promise<string>;
    readStream(): Promise<Readable>;
    signedGetUrl(): Promise<string>;
    signedPutUrl(): Promise<string>;
}
