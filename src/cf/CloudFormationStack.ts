import { AwsDataApiNode } from '../node/AwsDataApiNode';
import { ApiNode } from '../node/ApiNode';
import { AwsApi } from '../awsapi/AwsApi';

const debug = require('debug')('fluentaws:CloudFormationStack');

export class CloudFormationStack extends AwsDataApiNode<AWS.CloudFormation.Stack> {
  stackName: string;

  constructor(parent: ApiNode, stackName: string) {
    super(parent);
    this.stackName = stackName;
  }

  loadAwsData() {
    return AwsApi.cloudFormation(this.config()).describeStack(this.stackName);
  }

  /**
   * Returns summaries of all resources in the stack.
   */
  async resources(): Promise<AWS.CloudFormation.StackResourceSummary[]> {
    await this.ensureResolved();
    return await AwsApi.cloudFormation(this.config()).listStackResources(this.stackName);
  }

  /**
   * Returns the template of the stack, including new lines.
   */
  async template(): Promise<string> {
    await this.ensureResolved();
    return await AwsApi.cloudFormation(this.config()).getTemplate(this.stackName);
  }

  /**
   * Checks the stack for drift information, e.g. resources whose attributes have changed compared to the
   * template that was used when the stack was created or last updated. NOTE! This is an operation that
   * may take several minutes.
   */
  async checkDrift(pauseMilliseconds: number = 10000): Promise<AWS.CloudFormation.StackResourceDrift[]> {
    await this.ensureResolved();
    const driftDetectionId = await AwsApi.cloudFormation(this.config()).detectStackDrift(this.stackName);
    while (true) {
      // Pause for 10 seconds
      await new Promise<void>((resolve) => setTimeout(() => resolve(), pauseMilliseconds));
      const status = await AwsApi.cloudFormation(this.config()).describeStackDriftDetectionStatus(driftDetectionId);
      switch (status) {
        case 'DETECTION_FAILED':
          const drifts = await AwsApi.cloudFormation(this.config()).describeStackResourceDrifts(this.stackName);
          throw new Error(`Drift detection failed! Available drift info: ${JSON.stringify(drifts)}`);
        case 'DETECTION_COMPLETE':
          return await AwsApi.cloudFormation(this.config()).describeStackResourceDrifts(this.stackName);
      }
    }
  }
}