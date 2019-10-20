import { AwsDataApiNode } from "../node/AwsDataApiNode";
import { AwsApi } from '../awsapi/AwsApi';
import { ApiNode } from "../node/ApiNode";

/**
 * Represents a parameter in Systems Manager Parameter Store.
 */
export class SystemsManagerParameter extends AwsDataApiNode<AWS.SSM.Parameter> {
  parameterName: string;

  constructor(parent: ApiNode, parameterName: string) {
    super(parent);
    this.parameterName = parameterName;
  }

  loadAwsData() {
    return AwsApi.systemsManager.getParameter(this.parameterName);
  }

  /**
   * Returns the metadata for this parameter.
   */
  async metaData(): Promise<AWS.SSM.ParameterMetadata> {
    await this.ensureResolved();
    return AwsApi.systemsManager.describeParameter(this.parameterName);
  }
}