import { Parameter, ParameterMetadata, PutParameterRequest } from '@aws-sdk/client-ssm';
import { FluentAwsConfig } from '../FluentAwsConfig';
export declare class SystemsManagerApi {
    private config;
    private ssm;
    constructor(config: FluentAwsConfig);
    describeParameters(): Promise<ParameterMetadata[]>;
    describeParameter(parameterName: string): Promise<ParameterMetadata>;
    getParameter(parameterName: string): Promise<Parameter>;
    getParameters(names: string[], withDecryption?: boolean): Promise<Parameter[]>;
    getParametersByPath(path: string, withDecryption?: boolean): Promise<Parameter[]>;
    putParameter(request: PutParameterRequest): Promise<void>;
}
