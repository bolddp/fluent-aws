import { ApiNodeCollection } from '../node/ApiNodeCollection';
import { CloudFormationStack } from './CloudFormationStack';
import { Stack } from '@aws-sdk/client-cloudformation';
export declare class CloudFormationStackCollection extends ApiNodeCollection<CloudFormationStack, Stack> {
    apiNodeFromAwsData(data: Stack): CloudFormationStack;
    apiNodeFromId(id: string): CloudFormationStack;
    load(): Promise<Stack[]>;
}
