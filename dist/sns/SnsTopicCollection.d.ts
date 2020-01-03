import { ApiNodeCollection } from '../node/ApiNodeCollection';
import { SnsTopic } from './SnsTopic';
export declare class SnsTopicCollection extends ApiNodeCollection<SnsTopic, AWS.SNS.Topic> {
    load(): Promise<AWS.SNS.Topic[]>;
    apiNodeFromAwsData(data: AWS.SNS.Topic): SnsTopic;
    apiNodeFromId(id: string): SnsTopic;
}
