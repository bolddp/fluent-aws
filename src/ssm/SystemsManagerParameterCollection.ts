import { ApiNodeCollection } from '../node/ApiNodeCollection';
import { SystemsManagerParameter } from './SystemsManagerParameter';
import { ApiNodeFactory } from '../node/ApiNodeFactory';
import { AwsApi } from '../awsapi/AwsApi';
import {
  Parameter,
  ParameterMetadata,
  PutParameterRequest,
} from '@aws-sdk/client-ssm';

/**
 * Represents all the parameters in a region in Parameter Store. All parameters, including their decrypted values,
 * can be fetched by using the {@link #awsData()} method.
 */
export class SystemsManagerParameterCollection extends ApiNodeCollection<
  SystemsManagerParameter,
  Parameter
> {
  public async load(): Promise<Parameter[]> {
    // We need to first load all parameter metadata and then iterate over the parameter names,
    // downloading 10 at a time, so this may take some time
    const parameters = await AwsApi.systemsManager(
      this.config()
    ).describeParameters();
    const parameterNames = parameters.map((x) => x.Name);
    let result: Parameter[] = [];
    const recursiveFunction = async (names: string[]) => {
      const response = await AwsApi.systemsManager(this.config()).getParameters(
        names
      );
      result = result.concat(response);
      if (parameterNames.length > 0) {
        await recursiveFunction(parameterNames.splice(0, 10));
      }
    };
    await recursiveFunction(parameterNames.splice(0, 10));
    return result;
  }

  public apiNodeFromAwsData(data: Parameter): SystemsManagerParameter {
    return ApiNodeFactory.systemsManagerParameter(this, data.Name);
  }

  public apiNodeFromId(id: string): SystemsManagerParameter {
    return ApiNodeFactory.systemsManagerParameter(this, id);
  }

  /**
   * Retrieves metadata for all parameters in Parameter Store.
   */
  async metaData(): Promise<ParameterMetadata[]> {
    await this.ensureResolved();
    return await AwsApi.systemsManager(this.config()).describeParameters();
  }

  /**
   * Creates or updates a Parameter Store parameter.
   */
  async put(request: PutParameterRequest): Promise<void> {
    await this.ensureResolved();
    await AwsApi.systemsManager(this.config()).putParameter(request);
  }
}
