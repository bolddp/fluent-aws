import { ApiNodeCollection } from '../node/ApiNodeCollection';
import { EcsTask } from './EcsTask';
import { ApiNode } from '../node/ApiNode';
import { Task } from '@aws-sdk/client-ecs';
export declare class EcsTaskCollection extends ApiNodeCollection<EcsTask, Task> {
    clusterId: string;
    constructor(parent: ApiNode, clusterId: string);
    apiNodeFromAwsData(awsData: Task): EcsTask;
    apiNodeFromId(id: string): EcsTask;
    load(): Promise<Task[]>;
}
