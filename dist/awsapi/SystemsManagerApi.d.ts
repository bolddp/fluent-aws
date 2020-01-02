import * as AWS from 'aws-sdk';
export declare class SystemsManagerApi {
    ssm: () => AWS.SSM;
    describeParameters(): Promise<AWS.SSM.ParameterMetadata[]>;
    describeParameter(parameterName: string): Promise<AWS.SSM.ParameterMetadata>;
    getParameter(parameterName: string): Promise<AWS.SSM.Parameter>;
    getParameters(names: string[], withDecryption?: boolean): Promise<AWS.SSM.Parameter[]>;
    getParametersByPath(path: string, withDecryption?: boolean): Promise<AWS.SSM.Parameter[]>;
    putParameter(request: AWS.SSM.PutParameterRequest): Promise<void>;
}
