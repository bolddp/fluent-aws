import { Readable } from 'stream';
import { FluentAwsConfig } from '../FluentAwsConfig';
import {
  Bucket,
  GetObjectCommand,
  GetObjectCommandInput,
  GetObjectOutput,
  PutObjectCommand,
  PutObjectCommandInput,
  S3,
  _Object,
} from '@aws-sdk/client-s3';
import { getSignedUrl as s3GetSignedUrl } from '@aws-sdk/s3-request-presigner';

export class S3Api {
  private s3 = () =>
    new S3({
      region: this.config.region,
      credentials: this.config.credentials,
    });

  constructor(private config: FluentAwsConfig) {}

  getClient(): S3 {
    return this.s3();
  }

  async headBucket(bucketName: string): Promise<void> {
    await this.s3().headBucket({ Bucket: bucketName });
  }

  async createBucket(bucketName: string): Promise<void> {
    await this.s3().createBucket({ Bucket: bucketName });
  }

  async listObjects(bucketName: string, prefix?: string): Promise<_Object[]> {
    const response = await this.s3().listObjects({
      Bucket: bucketName,
      Prefix: prefix,
    });
    return response.Contents;
  }

  async listBuckets(): Promise<Bucket[]> {
    const response = await this.s3().listBuckets({});
    return response.Buckets;
  }

  async headObject(bucketName: string, key: string): Promise<void> {
    await this.s3().headObject({
      Bucket: bucketName,
      Key: key,
    });
  }

  async getObject(bucketName: string, key: string): Promise<GetObjectOutput> {
    const response = await this.s3().getObject({
      Bucket: bucketName,
      Key: key,
    });
    return response;
  }

  async getObjectStream(
    bucketName: string,
    key: string
  ): Promise<ReadableStream> {
    const response = await this.s3().getObject({
      Bucket: bucketName,
      Key: key,
    });
    return response.Body.transformToWebStream();
  }

  async deleteObject(bucketName: string, key: string): Promise<void> {
    await this.s3().deleteObject({
      Bucket: bucketName,
      Key: key,
    });
  }

  async upload(
    bucketName: string,
    key: string,
    body: Readable,
    contentType: string
  ): Promise<void> {
    await this.s3().putObject({
      Bucket: bucketName,
      Key: key,
      Body: body,
      ContentType: contentType,
    });
  }

  async putObject(
    bucketName: string,
    key: string,
    body: Readable
  ): Promise<void> {
    await this.s3().putObject({
      Bucket: bucketName,
      Key: key,
      Body: body,
    });
  }

  async copyObject(
    sourceBucket: string,
    sourceKey: string,
    targetBucket: string,
    targetKey: string,
    acl?: string
  ): Promise<void> {
    await this.s3().copyObject({
      CopySource: `/${sourceBucket}/${sourceKey}`,
      Bucket: targetBucket,
      Key: targetKey,
      ACL: acl,
    });
  }

  getSignedUrl(
    operation: string,
    bucket: string,
    key: string
  ): Promise<string> {
    const params: PutObjectCommandInput | GetObjectCommandInput = {
      Bucket: bucket,
      Key: key,
    };
    const command =
      operation === 'putObject'
        ? new PutObjectCommand(params)
        : new GetObjectCommand(params);
    return s3GetSignedUrl(this.s3(), command);
  }
}
