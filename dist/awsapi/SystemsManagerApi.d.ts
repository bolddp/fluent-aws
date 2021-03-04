import * as AWS from 'aws-sdk';
import { FluentAwsConfig } from '../FluentAwsConfig';
export declare class SystemsManagerApi {
    config: FluentAwsConfig;
    ssm: () => AWS.SSM;
    constructor(config: FluentAwsConfig);
    describeParameters(): Promise<AWS.SSM.ParameterMetadata[]>;
    describeParameter(parameterName: string): Promise<AWS.SSM.ParameterMetadata>;
    getParameter(parameterName: string): Promise<AWS.SSM.Parameter>;
    getParameters(names: string[], withDecryption?: boolean): Promise<AWS.SSM.Parameter[]>;
    getParametersByPath(path: string, withDecryption?: boolean): Promise<AWS.SSM.Parameter[]>;
    putParameter(request: AWS.SSM.PutParameterRequest): Promise<void>;
}
