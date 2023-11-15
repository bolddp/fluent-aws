import { Stack, StackResourceDrift, StackResourceSummary } from '@aws-sdk/client-cloudformation';
import { FluentAwsConfig } from '../FluentAwsConfig';
export declare class CloudFormationApi {
    private config;
    private cf;
    constructor(config: FluentAwsConfig);
    describeStacks(): Promise<Stack[]>;
    describeStack(stackName: string): Promise<Stack>;
    detectStackDrift(stackName: string): Promise<string>;
    describeStackDriftDetectionStatus(driftDetectionId: string): Promise<string>;
    describeStackResourceDrifts(stackName: string): Promise<StackResourceDrift[]>;
    listStackResources(stackName: string): Promise<StackResourceSummary[]>;
    getTemplate(stackName: string, templateStage?: 'Original' | 'Processed'): Promise<string>;
}
