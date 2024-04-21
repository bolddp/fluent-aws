import { AwsApi } from '../awsapi/AwsApi';
import { ApiNode } from '../node/ApiNode';

export class SqsQueue extends ApiNode {
  constructor(parent: ApiNode, private url: string) {
    super(parent);
  }

  async sendJson(obj: any): Promise<void> {
    await this.ensureResolved();
    await AwsApi.sqs(this.config()).sendMessage({
      QueueUrl: this.url,
      MessageBody: JSON.stringify(obj),
    });
  }

  async sendJsonBatch(objs: any[]): Promise<void> {
    await this.ensureResolved();

    // Create batches of 10 messages in each
    let batches: any[][] = [];
    for (let i = 0; i < objs.length; i += 10) {
      batches.push(objs.slice(i, i + 10));
    }

    for (const batch of batches) {
      await AwsApi.sqs(this.config()).sendMessageBatch({
        QueueUrl: this.url,
        Entries: batch.map((obj, index) => ({
          Id: index.toString(),
          MessageBody: JSON.stringify(obj),
        })),
      });
    }
  }
}
