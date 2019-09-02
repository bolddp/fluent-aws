import { ApiNode } from "../node/ApiNode";
import { S3Bucket } from "./S3Bucket";
import { Readable } from "stream";
import { AwsApi } from "../awsapi/AwsApi";
import { AwsDataApiNode } from "../node/AwsDataApiNode";

export class S3Object extends AwsDataApiNode<AWS.S3.GetObjectOutput> {
  bucketName: string;
  key: string;

  constructor(parent: ApiNode, bucketName: string, key: string, awsData?: AWS.S3.Object) {
    super(parent, awsData);
    this.bucketName = bucketName;
    this.key = key;
  }

  loadAwsData() {
    return AwsApi.s3.getObject(this.bucketName, this.key);
  }

  async delete(): Promise<void> {
    await this.ensureResolved();
    await AwsApi.s3.deleteObject(this.bucketName, this.key);
  }

  async writeS3Object(s3Object: S3Object): Promise<S3Object> {
    await this.ensureResolved();
    await AwsApi.s3.copyObject(s3Object.bucketName, s3Object.key, this.bucketName, this.key);
    return s3Object;
  }

  async writeString(contents: string): Promise<void> {
    await this.ensureResolved();
    await AwsApi.s3.putObject(this.bucketName, this.key, contents);
  }

  async readString(): Promise<string> {
    const obj = await this.awsData();
    return obj.Body.toString();
  }

  async readStream(): Promise<Readable> {
    await this.ensureResolved();
    return AwsApi.s3.getObjectStream(this.bucketName, this.key);
  }
}