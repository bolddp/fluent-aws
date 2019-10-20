import { ApiNode } from '../node/ApiNode';
import { ApiNodeFactory } from '../node/ApiNodeFactory';
import { CloudFormationStackCollection } from './CloudFormationStackCollection';
export class CloudFormation extends ApiNode {
  stackCollection: CloudFormationStackCollection;

  constructor(parent: ApiNode) {
    super(parent);
    this.stackCollection = ApiNodeFactory.cloudFormationStackCollection(this);
  }

  stacks() {
    return this.stackCollection;
  }

  stack(name: string) {
    return this.stackCollection.getById(name);
  }
}