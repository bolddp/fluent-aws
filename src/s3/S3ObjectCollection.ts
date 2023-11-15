import { S3Object } from './S3Object';
import { ApiNodeCollection } from '../node/ApiNodeCollection';
import { ApiNodeFactory } from '../node/ApiNodeFactory';
import { ApiNode } from '../node/ApiNode';
import { AwsApi } from '../awsapi/AwsApi';
import { _Object } from '@aws-sdk/client-s3';

export class S3ObjectCollection extends ApiNodeCollection<S3Object, _Object> {
  bucketName: string;
  prefix: string;

  constructor(parent: ApiNode, bucketName: string, prefix?: string) {
    super(parent);
    this.bucketName = bucketName;
    this.prefix = prefix;
  }

  apiNodeFromAwsData(awsData: _Object) {
    return ApiNodeFactory.s3Object(this, this.bucketName, awsData.Key);
  }

  apiNodeFromId(id: string) {
    return ApiNodeFactory.s3Object(this, this.bucketName, id);
  }

  async load(): Promise<_Object[]> {
    return AwsApi.s3(this.config()).listObjects(this.bucketName, this.prefix);
  }
}
