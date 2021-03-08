import { ApiNode } from '../node/ApiNode';
import { S3Object } from './S3Object';
import { ApiNodeFactory } from '../node/ApiNodeFactory';
import { S3ObjectCollection } from './S3ObjectCollection';
import { AwsApi } from '../awsapi/AwsApi';

const debug = require('debug')('fluentaws:S3Bucket');

export class S3Bucket extends ApiNode {
  objectCollectionPrefix: string;
  objectCollection: S3ObjectCollection;
  name: string;

  constructor(parent: ApiNode, name: string) {
    super(parent);
    this.name = name;
  }

  private getObjectCollection(prefix: string = ''): S3ObjectCollection {
    if (this.objectCollectionPrefix != prefix || !this.objectCollection) {
      this.objectCollection = ApiNodeFactory.s3ObjectCollection(this, this.name, prefix);
    }
    return this.objectCollection;
  }

  /**
   * Indicates whether the bucket exists or not.
   */
  async exists(): Promise<boolean> {
    try {
      debug('checking exists: %s', this.name);
      await AwsApi.s3(this.config()).headBucket(this.name);
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
        await AwsApi.s3(this.config()).createBucket(this.name);
        debug('created bucket: %s', this.name);
      }
    });
    return this;
  }

  objects(prefix?: string): S3ObjectCollection {
    return this.getObjectCollection(prefix);
  }

  object(key: string): S3Object {
    return this.getObjectCollection().getById(key);
  }
}