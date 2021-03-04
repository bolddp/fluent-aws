import * as AWS from 'aws-sdk';
import { FluentAwsConfig } from '../FluentAwsConfig';

const debug = require('debug')('fluentaws:SystemsManagerApi');

export class SystemsManagerApi {
  config: FluentAwsConfig;
  ssm = () => new AWS.SSM(this.config);

  constructor(config: FluentAwsConfig) {
    this.config = config;
  }

  async describeParameters(): Promise<AWS.SSM.ParameterMetadata[]> {
    debug('describing parameters');
    let result: AWS.SSM.ParameterMetadata[] = [];
    const recursiveFunction = async (nextToken?: string) => {
      const response = await this.ssm().describeParameters({
        NextToken: nextToken
      }).promise();
      result = result.concat(response.Parameters);
      if (response.NextToken) {
        await recursiveFunction(response.NextToken);
      }
    }

    await recursiveFunction();
    debug('described parameters');
    return result;
  }

  async describeParameter(parameterName: string): Promise<AWS.SSM.ParameterMetadata> {
    debug('describing parameter: %s', parameterName);
    const response = await this.ssm().describeParameters({
      Filters: [{
        Key: 'Name',
        Values: [parameterName]
      }]
    }).promise();
    if (response.Parameters.length == 0) {
      throw new Error(`Parameter not found: ${parameterName}`);
    }
    debug('described parameter');
    return response.Parameters[0];
  }

  async getParameter(parameterName: string): Promise<AWS.SSM.Parameter> {
    debug('getting parameter: %s', parameterName);
    const response = await this.ssm().getParameter({
      Name: parameterName,
      WithDecryption: true
    }).promise();
    if (!response.Parameter) {
      throw new Error(`Parameter not found: ${parameterName}`);
    }
    debug('got parameter');
    return response.Parameter;
  }

  async getParameters(names: string[], withDecryption: boolean = true): Promise<AWS.SSM.Parameter[]> {
    debug('getting parameters: %j', names);
    const response = await this.ssm().getParameters({
      Names: names,
      WithDecryption: withDecryption
    }).promise();
    debug('got parameters');
    return response.Parameters;
  }

  async getParametersByPath(path: string, withDecryption: boolean = true): Promise<AWS.SSM.Parameter[]> {
    debug('getting parameters by path: %s', path);
    let result: AWS.SSM.Parameter[] = [];
    const recursiveFunction = async (nextToken?: string) => {
      const response = await this.ssm().getParametersByPath({
        Path: path,
        WithDecryption: withDecryption,
        NextToken: nextToken
      }).promise();
      result = result.concat(response.Parameters);
      if (response.NextToken) {
        await recursiveFunction(response.NextToken);
      }
    }
    await recursiveFunction();
    debug('got parameters by path');
    return result;
  }

  async putParameter(request: AWS.SSM.PutParameterRequest): Promise<void> {
    debug('putting parameter: %j', request);
    await this.ssm().putParameter(request).promise();
    debug('put parameter');
  }
}
