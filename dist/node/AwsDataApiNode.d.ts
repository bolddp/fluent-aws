import { ApiNode } from "./ApiNode";
/**
 * An API node that can provide AWS data about itself.
 */
export declare abstract class AwsDataApiNode<T> extends ApiNode {
    constructor(parent: ApiNode);
    /**
     * Loads the AWS data for this node, through the AWS SDK.
     */
    protected abstract loadAwsData(): Promise<T>;
    /**
     * Returns the AWS Data, either by loading from the cache or by
     * getting it from the AWS SDK.
     */
    awsData(): Promise<T>;
}
