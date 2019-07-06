import { ApiNode } from "./ApiNode";

/**
 * An API node that can provide AWS data about itself.
 */
export abstract class AwsDataApiNode<T> extends ApiNode {
  awsDataInstance?: T;

  constructor(parent: ApiNode, initialValue?: T) {
    super(parent);
    this.awsDataInstance = initialValue;
  }

  /**
   * Loads the AWS data for this node, through the AWS SDK.
   */
  abstract loadAwsData(): Promise<T>;

  /**
   * Returns the AWS Data, either by loading from the cache or by
   * getting it from the AWS SDK.
   */
  async awsData(): Promise<T> {
    await this.resolveNode();
    if (!this.awsDataInstance) {
      this.awsDataInstance = await this.loadAwsData();
    }
    return this.awsDataInstance;
  }
}