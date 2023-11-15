import {
  CloudFormation,
  Stack,
  StackResourceDrift,
  StackResourceSummary,
} from '@aws-sdk/client-cloudformation';
import { FluentAwsConfig } from '../FluentAwsConfig';

const debug = require('debug')('fluentaws:CloudFormationApi');

export class CloudFormationApi {
  private cf = () => new CloudFormation(this.config);

  constructor(private config: FluentAwsConfig) {}

  async describeStacks() {
    debug('describing stacks');
    let result: Stack[] = [];
    // Perform the call in a function since we may need to recursively call it
    const recursiveFunction = async (nextToken?: string) => {
      const response = await this.cf().describeStacks(
        nextToken ? { NextToken: nextToken! } : {}
      );
      result = result.concat(response.Stacks);
      if (response.NextToken) {
        await recursiveFunction(response.NextToken);
      }
    };
    await recursiveFunction();
    debug('described stacks');
    return result;
  }

  async describeStack(stackName: string): Promise<Stack> {
    debug('describing stack: %s', stackName);
    const response = await this.cf().describeStacks({
      StackName: stackName,
    });
    if (response.Stacks.length == 0) {
      throw new Error(`Stack not found: ${stackName}`);
    }
    debug('described stack');
    return response.Stacks[0];
  }

  async detectStackDrift(stackName: string): Promise<string> {
    debug('detecting stack drift: %s', stackName);
    const response = await this.cf().detectStackDrift({
      StackName: stackName,
    });
    debug('detected stack drift');
    return response.StackDriftDetectionId;
  }

  async describeStackDriftDetectionStatus(
    driftDetectionId: string
  ): Promise<string> {
    debug('describing StackDriftDetectionStatus: %s', driftDetectionId);
    const response = await this.cf().describeStackDriftDetectionStatus({
      StackDriftDetectionId: driftDetectionId,
    });
    debug('described StackDriftDetectionStatus');
    return response.DetectionStatus;
  }

  async describeStackResourceDrifts(
    stackName: string
  ): Promise<StackResourceDrift[]> {
    debug('describing StackResourceDrifts: %s', stackName);
    const response = await this.cf().describeStackResourceDrifts({
      StackName: stackName,
    });
    debug('described StackResourceDrifts');
    return response.StackResourceDrifts;
  }

  async listStackResources(stackName: string): Promise<StackResourceSummary[]> {
    debug('listing stack resources: %s', stackName);
    let result: StackResourceSummary[] = [];
    const recursiveFunction = async (nextToken?: string) => {
      const response = await this.cf().listStackResources({
        StackName: stackName,
        NextToken: nextToken,
      });
      result = result.concat(response.StackResourceSummaries);
      if (response.NextToken) {
        await recursiveFunction(response.NextToken);
      }
    };
    await recursiveFunction();
    debug('listed stack resources');
    return result;
  }

  async getTemplate(
    stackName: string,
    templateStage: 'Original' | 'Processed' = 'Processed'
  ): Promise<string> {
    debug('getting stack template: %s', stackName);
    const response = await this.cf().getTemplate({
      StackName: stackName,
      TemplateStage: templateStage,
    });
    debug('got stack template');
    return response.TemplateBody;
  }
}
