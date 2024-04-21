import { ApiNode } from '../node/ApiNode';
import { SqsQueue } from './SqsQueue';
import { SqsQueueCollection } from './SqsQueueCollection';
export declare class Sqs extends ApiNode {
    private queueCollection;
    constructor(parent: ApiNode);
    queues(): SqsQueueCollection;
    queue(url: string): SqsQueue;
}
