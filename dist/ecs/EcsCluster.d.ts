import { EcsTask } from "./EcsTask";
import { ApiNode } from "../node/ApiNode";
import { EcsServiceCollection } from "./EcsServiceCollection";
import { EcsTaskCollection } from "./EcsTaskCollection";
import { EcsService } from "./EcsService";
import { AwsDataApiNode } from "../node/AwsDataApiNode";
export declare class EcsCluster extends AwsDataApiNode<AWS.ECS.Cluster> {
    idOrArn: string;
    serviceCollection: EcsServiceCollection;
    taskCollection: EcsTaskCollection;
    constructor(parent: ApiNode, idOrArn: string);
    loadAwsData(): Promise<import("aws-sdk/clients/ecs").Cluster>;
    task(id: string): EcsTask;
    tasks(): EcsTaskCollection;
    service(id: string): EcsService;
    services(): EcsServiceCollection;
}
