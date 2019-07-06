import { ApiNode } from '../node/ApiNode';
import { S3Object } from './S3Object';
import { ApiNodeFactory } from '../node/ApiNodeFactory';
import { S3ObjectCollection } from './S3ObjectCollection';
import { AwsApi } from '../awsapi/AwsApi';

const debug = require('debug')('fluentaws:S3Bucket');

export class S3Bucket extends ApiNode {
  objectCollection: S3ObjectCollection;
  name: string;

  constructor(parent: ApiNode, name: string) {
    super(parent);
    this.name = name;
    this.objectCollection = ApiNodeFactory.s3ObjectCollection(this, this);
  }

  /**
   * Indicates whether the bucket exists or not.
   */
  async exists(): Promise<boolean> {
    try {
      debug('checking exists: %s', this.name);
      await AwsApi.s3.headBucket(this.name);
      debug('checked exists: %s = true', this.name);
      return true;
    } catch (error) {
      if (error.statusCode === 404) {
        debug('checked exists: %s = false', this.name);
        return false;
      }
      throw error;
    }
  }

  /**
   * Attempts to create the S3 bucket if it doesn't exist.
   */
  createIfNotExists(): S3Bucket {
    this.promiseChain.add(async () => {
      const exists = await this.exists();
      if (!exists) {
        debug('create bucket: %s', this.name);
        await AwsApi.s3.createBucket(this.name);
        debug('created bucket: %s', this.name);
      }
    });
    return this;
  }

  objects(): S3ObjectCollection {
    return this.objectCollection;
  }

  object(key: string): S3Object {
    return this.objectCollection.getById(key);
  }

  async resolve(): Promise<S3Bucket> {
    await this.resolveNode();
    return this;
  }
}