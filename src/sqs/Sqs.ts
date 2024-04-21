import { ApiNode } from '../node/ApiNode';
import { ApiNodeFactory } from '../node/ApiNodeFactory';
import { SqsQueue } from './SqsQueue';
import { SqsQueueCollection } from './SqsQueueCollection';

export class Sqs extends ApiNode {
  private queueCollection: SqsQueueCollection;

  constructor(parent: ApiNode) {
    super(parent);
    this.queueCollection = ApiNodeFactory.sqsQueueCollection(this);
  }

  queues(): SqsQueueCollection {
    return this.queueCollection;
  }

  queue(url: string): SqsQueue {
    return this.queueCollection.getById(url);
  }
}
