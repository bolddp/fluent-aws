import { AwsDataApiNode } from '../node/AwsDataApiNode';
import { ApiNode } from '../node/ApiNode';
import { Stack, StackResourceSummary, StackResourceDrift } from '@aws-sdk/client-cloudformation';
export declare class CloudFormationStack extends AwsDataApiNode<Stack> {
    stackName: string;
    constructor(parent: ApiNode, stackName: string);
    loadAwsData(): Promise<Stack>;
    /**
     * Returns summaries of all resources in the stack.
     */
    resources(): Promise<StackResourceSummary[]>;
    /**
     * Returns the template of the stack, including new lines.
     */
    template(): Promise<string>;
    /**
     * Checks the stack for drift information, e.g. resources whose attributes have changed compared to the
     * template that was used when the stack was created or last updated. NOTE! This is an operation that
     * may take several minutes.
     */
    checkDrift(pauseMilliseconds?: number): Promise<StackResourceDrift[]>;
}
