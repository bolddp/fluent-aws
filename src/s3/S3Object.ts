import { ApiNode } from '../node/ApiNode';
import { Readable } from 'stream';
import { AwsApi } from '../awsapi/AwsApi';
import { AwsDataApiNode } from '../node/AwsDataApiNode';
import { GetObjectOutput, ObjectCannedACL } from '@aws-sdk/client-s3';

const debug = require('debug')('fluentaws:S3Object');

export class S3Object extends AwsDataApiNode<GetObjectOutput> {
  bucketName: string;
  key: string;

  constructor(parent: ApiNode, bucketName: string, key: string) {
    super(parent);
    this.bucketName = bucketName;
    this.key = key;
  }

  loadAwsData() {
    return AwsApi.s3(this.config()).getObject(this.bucketName, this.key);
  }

  /**
   * Indicates whether the bucket exists or not.
   */
  async exists(): Promise<boolean> {
    try {
      debug(
        'checking object exists... bucket: %s, key: %s',
        this.bucketName,
        this.key
      );
      await AwsApi.s3(this.config()).headObject(this.bucketName, this.key);
      debug(
        'checked object exists = true... bucket: %s, key: %s',
        this.bucketName,
        this.key
      );
      return true;
    } catch (error) {
      if (error.name === 'NotFound') {
        debug(
          'checked object exists = false... bucket: %s, key: %s',
          this.bucketName,
          this.key
        );
        return false;
      }
      throw error;
    }
  }

  async delete(): Promise<void> {
    await this.ensureResolved();
    await AwsApi.s3(this.config()).deleteObject(this.bucketName, this.key);
  }

  async writeS3Object(
    s3Object: S3Object,
    acl?: ObjectCannedACL
  ): Promise<S3Object> {
    await this.ensureResolved();
    await AwsApi.s3(this.config()).copyObject(
      s3Object.bucketName,
      s3Object.key,
      this.bucketName,
      this.key,
      acl
    );
    return s3Object;
  }

  async writeString(contents: string): Promise<void> {
    await this.ensureResolved();
    await AwsApi.s3(this.config()).putObject(
      this.bucketName,
      this.key,
      Readable.from(contents)
    );
  }

  async readString(): Promise<string> {
    const obj = await this.awsData();
    return obj.Body.toString();
  }

  async readStream(): Promise<ReadableStream> {
    await this.ensureResolved();
    return AwsApi.s3(this.config()).getObjectStream(this.bucketName, this.key);
  }
}
