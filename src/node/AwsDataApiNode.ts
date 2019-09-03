import { ApiNode } from "./ApiNode";

/**
 * An API node that can provide AWS data about itself.
 */
export abstract class AwsDataApiNode<T> extends ApiNode {
  constructor(parent: ApiNode) {
    super(parent);
  }

  /**
   * Loads the AWS data for this node, through the AWS SDK.
   */
  protected abstract loadAwsData(): Promise<T>;

  /**
   * Returns the AWS Data, either by loading from the cache or by
   * getting it from the AWS SDK.
   */
  async awsData(): Promise<T> {
    await this.ensureResolved();
    return await this.loadAwsData();
  }
}