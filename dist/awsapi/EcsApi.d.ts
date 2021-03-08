import * as AWS from 'aws-sdk';
import { FluentAwsConfig } from '../FluentAwsConfig';
export declare class EcsApi {
    config: FluentAwsConfig;
    ecs: () => AWS.ECS;
    constructor(config: FluentAwsConfig);
    listClusters(): Promise<string[]>;
    describeClusters(idOrArns?: string[]): Promise<AWS.ECS.Cluster[]>;
    describeCluster(idOrArn: string): Promise<AWS.ECS.Cluster>;
    listTasks(clusterId: string): Promise<string[]>;
    describeTasks(clusterId: string, idOrArns: string[]): Promise<AWS.ECS.Task[]>;
    describeTask(clusterId: string, idOrArn: string): Promise<AWS.ECS.Task>;
    listServices(clusterId: string): Promise<string[]>;
    describeServices(clusterId: string, serviceNames: string[]): Promise<AWS.ECS.Service[]>;
    describeService(clusterId: string, serviceName: string): Promise<AWS.ECS.Service>;
    describeContainerInstances(clusterId: string, containerInstanceIds: string[]): Promise<AWS.ECS.ContainerInstance[]>;
    describeContainerInstance(clusterId: string, containerInstanceId: string): Promise<AWS.ECS.ContainerInstance>;
}
