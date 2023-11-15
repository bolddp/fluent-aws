import { Ec2Instance } from '../ec2/Ec2Instance';
import { ApiNode } from '../node/ApiNode';
import { AwsDataApiNode } from '../node/AwsDataApiNode';
import { Task } from '@aws-sdk/client-ecs';
export declare class EcsTask extends AwsDataApiNode<Task> {
    clusterId: string;
    idOrArn: string;
    ec2InstanceInstance: Ec2Instance;
    constructor(parent: ApiNode, clusterId: string, idOrArn: string);
    loadAwsData(): Promise<Task>;
    /**
     * The EC2 instance that this task runs on.
     */
    ec2Instance(): Ec2Instance;
}
