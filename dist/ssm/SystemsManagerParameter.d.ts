import { AwsDataApiNode } from "../node/AwsDataApiNode";
import { ApiNode } from "../node/ApiNode";
/**
 * Represents a parameter in Systems Manager Parameter Store.
 */
export declare class SystemsManagerParameter extends AwsDataApiNode<AWS.SSM.Parameter> {
    parameterName: string;
    constructor(parent: ApiNode, parameterName: string);
    loadAwsData(): Promise<import("aws-sdk/clients/ssm").Parameter>;
    /**
     * Returns the metadata for this parameter.
     */
    metaData(): Promise<AWS.SSM.ParameterMetadata>;
}
