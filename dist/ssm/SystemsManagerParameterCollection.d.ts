import { ApiNodeCollection } from '../node/ApiNodeCollection';
import { SystemsManagerParameter } from './SystemsManagerParameter';
/**
 * Represents all the parameters in a region in Parameter Store. All parameters, including their decrypted values,
 * can be fetched by using the {@link #awsData()} method.
 */
export declare class SystemsManagerParameterCollection extends ApiNodeCollection<SystemsManagerParameter, AWS.SSM.Parameter> {
    load(): Promise<AWS.SSM.Parameter[]>;
    apiNodeFromAwsData(data: AWS.SSM.Parameter): SystemsManagerParameter;
    apiNodeFromId(id: string): SystemsManagerParameter;
    /**
     * Retrieves metadata for all parameters in Parameter Store.
     */
    metaData(): Promise<AWS.SSM.ParameterMetadata[]>;
    /**
     * Creates or updates a Parameter Store parameter.
     */
    put(request: AWS.SSM.PutParameterRequest): Promise<void>;
}
