import { AwsDataApiNode } from '../node/AwsDataApiNode';
import { AwsApi } from '../awsapi/AwsApi';
import { ApiNode } from '../node/ApiNode';
import { Parameter, ParameterMetadata } from '@aws-sdk/client-ssm';

/**
 * Represents a parameter in Systems Manager Parameter Store.
 */
export class SystemsManagerParameter extends AwsDataApiNode<Parameter> {
  parameterName: string;

  constructor(parent: ApiNode, parameterName: string) {
    super(parent);
    this.parameterName = parameterName;
  }

  loadAwsData() {
    return AwsApi.systemsManager(this.config()).getParameter(
      this.parameterName
    );
  }

  /**
   * Returns the metadata for this parameter.
   */
  async metaData(): Promise<ParameterMetadata> {
    await this.ensureResolved();
    return AwsApi.systemsManager(this.config()).describeParameter(
      this.parameterName
    );
  }
}
