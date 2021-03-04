import { ApiNode } from '../node/ApiNode';
import { S3Object } from './S3Object';
import { S3ObjectCollection } from './S3ObjectCollection';
export declare class S3Bucket extends ApiNode {
    objectCollectionPrefix: string;
    objectCollection: S3ObjectCollection;
    name: string;
    constructor(parent: ApiNode, name: string);
    private getObjectCollection;
    /**
     * Indicates whether the bucket exists or not.
     */
    exists(): Promise<boolean>;
    /**
     * Attempts to create the S3 bucket if it doesn't exist.
     */
    createIfNotExists(): S3Bucket;
    objects(prefix?: string): S3ObjectCollection;
    object(key: string): S3Object;
}
