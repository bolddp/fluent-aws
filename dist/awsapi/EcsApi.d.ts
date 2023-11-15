import { Cluster, ContainerInstance, Service, Task } from '@aws-sdk/client-ecs';
import { FluentAwsConfig } from '../FluentAwsConfig';
export declare class EcsApi {
    private config;
    private ecs;
    constructor(config: FluentAwsConfig);
    listClusters(): Promise<string[]>;
    describeClusters(idOrArns?: string[]): Promise<Cluster[]>;
    describeCluster(idOrArn: string): Promise<Cluster>;
    listTasks(clusterId: string): Promise<string[]>;
    describeTasks(clusterId: string, idOrArns: string[]): Promise<Task[]>;
    describeTask(clusterId: string, idOrArn: string): Promise<Task>;
    listServices(clusterId: string): Promise<string[]>;
    describeServices(clusterId: string, serviceNames: string[]): Promise<Service[]>;
    describeService(clusterId: string, serviceName: string): Promise<Service>;
    describeContainerInstances(clusterId: string, containerInstanceIds: string[]): Promise<ContainerInstance[]>;
    describeContainerInstance(clusterId: string, containerInstanceId: string): Promise<ContainerInstance>;
}
