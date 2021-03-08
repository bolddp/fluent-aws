import * as AWS from 'aws-sdk';
import { FluentAwsConfig } from '../FluentAwsConfig';
export declare class CloudFormationApi {
    config: FluentAwsConfig;
    cf: () => AWS.CloudFormation;
    constructor(config: FluentAwsConfig);
    describeStacks(): Promise<AWS.CloudFormation.Stack[]>;
    describeStack(stackName: string): Promise<AWS.CloudFormation.Stack>;
    detectStackDrift(stackName: string): Promise<string>;
    describeStackDriftDetectionStatus(driftDetectionId: string): Promise<string>;
    describeStackResourceDrifts(stackName: string): Promise<AWS.CloudFormation.StackResourceDrift[]>;
    listStackResources(stackName: string): Promise<AWS.CloudFormation.StackResourceSummary[]>;
    getTemplate(stackName: string, templateStage?: 'Original' | 'Processed'): Promise<string>;
}
