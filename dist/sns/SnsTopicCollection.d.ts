import { ApiNodeCollection } from '../node/ApiNodeCollection';
import { SnsTopic } from './SnsTopic';
import { Topic } from '@aws-sdk/client-sns';
export declare class SnsTopicCollection extends ApiNodeCollection<SnsTopic, Topic> {
    load(): Promise<Topic[]>;
    apiNodeFromAwsData(data: Topic): SnsTopic;
    apiNodeFromId(id: string): SnsTopic;
}
