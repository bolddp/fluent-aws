import { S3Object } from './S3Object';
import { ApiNodeCollection } from '../node/ApiNodeCollection';
import { ApiNode } from '../node/ApiNode';
import { _Object } from '@aws-sdk/client-s3';
export declare class S3ObjectCollection extends ApiNodeCollection<S3Object, _Object> {
    bucketName: string;
    prefix: string;
    constructor(parent: ApiNode, bucketName: string, prefix?: string);
    apiNodeFromAwsData(awsData: _Object): S3Object;
    apiNodeFromId(id: string): S3Object;
    load(): Promise<_Object[]>;
}
