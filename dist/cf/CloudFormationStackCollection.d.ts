import { ApiNodeCollection } from '../node/ApiNodeCollection';
import { CloudFormationStack } from './CloudFormationStack';
export declare class CloudFormationStackCollection extends ApiNodeCollection<CloudFormationStack, AWS.CloudFormation.Stack> {
    apiNodeFromAwsData(data: AWS.CloudFormation.Stack): CloudFormationStack;
    apiNodeFromId(id: string): CloudFormationStack;
    load(): Promise<AWS.CloudFormation.Stack[]>;
}
