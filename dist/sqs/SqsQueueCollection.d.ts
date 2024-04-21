import { SqsQueue } from './SqsQueue';
import { ApiNodeCollection } from '../node/ApiNodeCollection';
export declare class SqsQueueCollection extends ApiNodeCollection<SqsQueue, string> {
    load(): Promise<string[]>;
    apiNodeFromAwsData(url: string): SqsQueue;
    apiNodeFromId(id: string): SqsQueue;
}
