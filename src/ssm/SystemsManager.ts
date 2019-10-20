import { ApiNode } from '../node/ApiNode';
import { ApiNodeFactory } from '../node/ApiNodeFactory';
import { SystemsManagerParameterCollection } from './SystemsManagerParameterCollection';

export class SystemsManager extends ApiNode {
  parameterCollection: SystemsManagerParameterCollection;

  constructor(parent: ApiNode) {
    super(parent);
    this.parameterCollection = ApiNodeFactory.systemsManagerParameterCollection(this);
  }

  parameters() {
    return this.parameterCollection;
  }

  parameter(parameterName: string) {
    return this.parameterCollection.getById(parameterName);
  }
}