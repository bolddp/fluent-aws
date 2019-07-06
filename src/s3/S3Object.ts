import { ApiNode } from "../node/ApiNode";
import { S3Bucket } from "./S3Bucket";
import { Readable } from "stream";
import { AwsApi } from "../awsapi/AwsApi";
import { AwsDataApiNode } from "../node/AwsDataApiNode";

export class S3Object extends AwsDataApiNode<AWS.S3.GetObjectOutput> {
  bucket: S3Bucket;
  key: string;

  constructor(parent: ApiNode, bucket: S3Bucket, key: string, awsData?: AWS.S3.Object) {
    super(parent, awsData);
    this.bucket = bucket;
    this.key = key;
  }

  loadAwsData() {
    return AwsApi.s3.getObject(this.bucket.name, this.key);
  }

  async delete(): Promise<void> {
    await this.resolveNode();
    await AwsApi.s3.deleteObject(this.bucket.name, this.key);
  }

  async writeS3Object(s3Object: S3Object): Promise<S3Object> {
    await this.resolveNode();
    await AwsApi.s3.copyObject(s3Object.bucket.name, s3Object.key, this.bucket.name, this.key);
    return s3Object;
  }

  async writeString(contents: string): Promise<void> {
    await this.resolveNode();
    await AwsApi.s3.putObject(this.bucket.name, this.key, contents);
  }

  async readString(): Promise<string> {
    const obj = await this.awsData();
    return obj.Body.toString();
  }

  readStream(): Promise<Readable> {
    return AwsApi.s3.getObjectStream(this.bucket.name, this.key);
  }

  async resolve(): Promise<S3Object> {
    await this.resolveNode();
    return this;
  }
}