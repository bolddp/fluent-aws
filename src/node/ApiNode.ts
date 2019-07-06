import { PromiseChain } from "./PromiseChain";

const debug = require('debug')('fluentaws:ApiNode');

/**
 * A node in the fluent API hierarchy. The responsibility of a node in the
 * hierarchy, e.g. an Ec2 or EcsTask instance, is to resolve its parent
 * before it resolves itself to make sure that all pending promises are executed.
 */
export class ApiNode {
  isResolving: boolean = false;
  promiseChain: PromiseChain;
  parent: ApiNode;

  constructor(parent: ApiNode) {
    this.parent = parent;
    this.promiseChain = new PromiseChain();
  }

  async resolveNode(): Promise<void> {
    if (!this.isResolving) {
      this.isResolving = true;
      try {
        if (this.parent) {
          await this.parent.resolveNode();
        }
        await this.promiseChain.resolve();
      } finally {
        this.isResolving = false;
      }
    } else {
      debug('WARN : resolveNode() called recursively, please make sure that awsData() or resolve() aren\'t used inside promise chains, instead use loadAwsData()');
    }
  }
}