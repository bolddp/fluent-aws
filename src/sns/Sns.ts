import { ApiNode } from '../node/ApiNode';
import { ApiNodeFactory } from '../node/ApiNodeFactory';
import { SnsTopicCollection } from './SnsTopicCollection';
import { SnsTopic } from './SnsTopic';

export class Sns extends ApiNode {
  private topicCollection: SnsTopicCollection;

  constructor(parent: ApiNode) {
    super(parent);
    this.topicCollection = ApiNodeFactory.snsTopicCollection(this);
  }

  topics(): SnsTopicCollection {
    return this.topicCollection;
  }

  topic(arn: string): SnsTopic {
    return this.topicCollection.getById(arn);
  }
}
