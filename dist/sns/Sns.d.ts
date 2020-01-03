import { ApiNode } from "../node/ApiNode";
import { SnsTopicCollection } from './SnsTopicCollection';
import { SnsTopic } from './SnsTopic';
export declare class Sns extends ApiNode {
    topicCollection: SnsTopicCollection;
    constructor(parent: ApiNode);
    topics(): SnsTopicCollection;
    topic(arn: string): SnsTopic;
}
