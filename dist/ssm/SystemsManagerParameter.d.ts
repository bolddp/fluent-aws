import { AwsDataApiNode } from '../node/AwsDataApiNode';
import { ApiNode } from '../node/ApiNode';
import { Parameter, ParameterMetadata } from '@aws-sdk/client-ssm';
/**
 * Represents a parameter in Systems Manager Parameter Store.
 */
export declare class SystemsManagerParameter extends AwsDataApiNode<Parameter> {
    parameterName: string;
    constructor(parent: ApiNode, parameterName: string);
    loadAwsData(): Promise<Parameter>;
    /**
     * Returns the metadata for this parameter.
     */
    metaData(): Promise<ParameterMetadata>;
}
