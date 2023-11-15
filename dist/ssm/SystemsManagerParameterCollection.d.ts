import { ApiNodeCollection } from '../node/ApiNodeCollection';
import { SystemsManagerParameter } from './SystemsManagerParameter';
import { Parameter, ParameterMetadata, PutParameterRequest } from '@aws-sdk/client-ssm';
/**
 * Represents all the parameters in a region in Parameter Store. All parameters, including their decrypted values,
 * can be fetched by using the {@link #awsData()} method.
 */
export declare class SystemsManagerParameterCollection extends ApiNodeCollection<SystemsManagerParameter, Parameter> {
    load(): Promise<Parameter[]>;
    apiNodeFromAwsData(data: Parameter): SystemsManagerParameter;
    apiNodeFromId(id: string): SystemsManagerParameter;
    /**
     * Retrieves metadata for all parameters in Parameter Store.
     */
    metaData(): Promise<ParameterMetadata[]>;
    /**
     * Creates or updates a Parameter Store parameter.
     */
    put(request: PutParameterRequest): Promise<void>;
}
