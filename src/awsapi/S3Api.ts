import * as AWS from 'aws-sdk';
import { Readable } from "stream";
import { Body } from "aws-sdk/clients/s3";

export class S3Api {
  s3 = () => new AWS.S3();

  async headBucket(bucketName: string): Promise<void> {
    await this.s3().headBucket({ Bucket: bucketName }).promise();
  }

  async createBucket(bucketName: string): Promise<void> {
    await this.s3().createBucket({ Bucket: bucketName }).promise();
  }

  async listObjects(bucketName: string): Promise<AWS.S3.Object[]> {
    const response = await this.s3().listObjects({
      Bucket: bucketName
    }).promise();
    return response.Contents;
  }

  async listBuckets(): Promise<AWS.S3.Bucket[]> {
    const response = await this.s3().listBuckets().promise();
    return response.Buckets;
  }

  async getObject(bucketName: string, key: string): Promise<AWS.S3.GetObjectOutput> {
    const response = await this.s3().getObject({
      Bucket: bucketName,
      Key: key
    }).promise();
    return response;
  }

  async getObjectStream(bucketName: string, key: string): Promise<Readable> {
    return this.s3().getObject({
      Bucket: bucketName,
      Key: key
    }).createReadStream();
  }

  async deleteObject(bucketName: string, key: string): Promise<void> {
    await this.s3().deleteObject({
      Bucket: bucketName,
      Key: key
    }).promise();
  }

  async upload(bucketName: string, key: string, body: Body, contentType: string): Promise<void> {
    await this.s3().upload({
      Bucket: bucketName,
      Key: key,
      Body: body,
      ContentType: contentType
    }).promise();
  }

  async putObject(bucketName: string, key: string, body: Body): Promise<void> {
    await this.s3().putObject({
      Bucket: bucketName,
      Key: key,
      Body: body
    }).promise();
  }

  async copyObject(sourceBucket: string, sourceKey: string, targetBucket: string, targetKey: string): Promise<void> {
    await this.s3().copyObject({
      CopySource: `/${sourceBucket}/${sourceKey}`,
      Bucket: targetBucket,
      Key: targetKey
    }).promise();
  }

}