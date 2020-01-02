import { ApiNodeCollection } from "../node/ApiNodeCollection";
import { EcsTask } from "./EcsTask";
import { ApiNode } from "../node/ApiNode";
export declare class EcsTaskCollection extends ApiNodeCollection<EcsTask, AWS.ECS.Task> {
    clusterId: string;
    constructor(parent: ApiNode, clusterId: string);
    apiNodeFromAwsData(awsData: AWS.ECS.Task): EcsTask;
    apiNodeFromId(id: string): EcsTask;
    load(): Promise<AWS.ECS.Task[]>;
}
