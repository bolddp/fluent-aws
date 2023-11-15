import {
  Parameter,
  ParameterMetadata,
  PutParameterRequest,
  SSM,
} from '@aws-sdk/client-ssm';
import { FluentAwsConfig } from '../FluentAwsConfig';

const debug = require('debug')('fluentaws:SystemsManagerApi');

export class SystemsManagerApi {
  private ssm = () => new SSM(this.config);

  constructor(private config: FluentAwsConfig) {}

  async describeParameters(): Promise<ParameterMetadata[]> {
    debug('describing parameters');
    let result: ParameterMetadata[] = [];
    const recursiveFunction = async (nextToken?: string) => {
      const response = await this.ssm().describeParameters({
        NextToken: nextToken,
      });
      result = result.concat(response.Parameters);
      if (response.NextToken) {
        await recursiveFunction(response.NextToken);
      }
    };

    await recursiveFunction();
    debug('described parameters');
    return result;
  }

  async describeParameter(parameterName: string): Promise<ParameterMetadata> {
    debug('describing parameter: %s', parameterName);
    const response = await this.ssm().describeParameters({
      Filters: [
        {
          Key: 'Name',
          Values: [parameterName],
        },
      ],
    });
    if (response.Parameters.length == 0) {
      throw new Error(`Parameter not found: ${parameterName}`);
    }
    debug('described parameter');
    return response.Parameters[0];
  }

  async getParameter(parameterName: string): Promise<Parameter> {
    debug('getting parameter: %s', parameterName);
    const response = await this.ssm().getParameter({
      Name: parameterName,
      WithDecryption: true,
    });
    if (!response.Parameter) {
      throw new Error(`Parameter not found: ${parameterName}`);
    }
    debug('got parameter');
    return response.Parameter;
  }

  async getParameters(
    names: string[],
    withDecryption: boolean = true
  ): Promise<Parameter[]> {
    debug('getting parameters: %j', names);
    const response = await this.ssm().getParameters({
      Names: names,
      WithDecryption: withDecryption,
    });
    debug('got parameters');
    return response.Parameters;
  }

  async getParametersByPath(
    path: string,
    withDecryption: boolean = true
  ): Promise<Parameter[]> {
    debug('getting parameters by path: %s', path);
    let result: Parameter[] = [];
    const recursiveFunction = async (nextToken?: string) => {
      const response = await this.ssm().getParametersByPath({
        Path: path,
        WithDecryption: withDecryption,
        NextToken: nextToken,
      });
      result = result.concat(response.Parameters);
      if (response.NextToken) {
        await recursiveFunction(response.NextToken);
      }
    };
    await recursiveFunction();
    debug('got parameters by path');
    return result;
  }

  async putParameter(request: PutParameterRequest): Promise<void> {
    debug('putting parameter: %j', request);
    await this.ssm().putParameter(request);
    debug('put parameter');
  }
}
