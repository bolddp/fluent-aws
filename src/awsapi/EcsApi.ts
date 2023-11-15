import {
  Cluster,
  ContainerInstance,
  ECS,
  Service,
  Task,
} from '@aws-sdk/client-ecs';
import { FluentAwsConfig } from '../FluentAwsConfig';

const debug = require('debug')('fluentaws:EcsApi');

export class EcsApi {
  private ecs = () => new ECS(this.config);

  constructor(private config: FluentAwsConfig) {}

  async listClusters(): Promise<string[]> {
    debug('listing ECS clusters');
    const response = await this.ecs().listClusters({});
    debug('listed ECS clusters');
    return response.clusterArns;
  }

  async describeClusters(idOrArns?: string[]): Promise<Cluster[]> {
    debug('describing ECS clusters: %j', idOrArns || {});
    const response = await this.ecs().describeClusters({
      clusters: idOrArns,
    });
    debug('described ECS clusters');
    return response.clusters;
  }

  async describeCluster(idOrArn: string): Promise<Cluster> {
    const clusters = await this.describeClusters();
    if (clusters.length == 0) {
      throw new Error(`Cluster not found: ${idOrArn}`);
    }
    return clusters[0];
  }

  async listTasks(clusterId: string): Promise<string[]> {
    debug('listing ECS tasks: %s', clusterId);
    const response = await this.ecs().listTasks({ cluster: clusterId });
    debug('listed ECS tasks');
    return response.taskArns;
  }

  async describeTasks(clusterId: string, idOrArns: string[]): Promise<Task[]> {
    debug('describing ECS tasks: %j', [clusterId, idOrArns]);
    const response = await this.ecs().describeTasks({
      cluster: clusterId,
      tasks: idOrArns,
    });
    debug('described ECS tasks');
    return response.tasks;
  }

  async describeTask(clusterId: string, idOrArn: string): Promise<Task> {
    const tasks = await this.describeTasks(clusterId, [idOrArn]);
    if (tasks.length == 0) {
      throw new Error(`Task not found: ${idOrArn}`);
    }
    return tasks[0];
  }

  async listServices(clusterId: string): Promise<string[]> {
    debug('listing ECS cluster services: %s', clusterId);
    const response = await this.ecs().listServices({
      cluster: clusterId,
      maxResults: 100,
    });
    debug('listed ECS cluster services');
    return response.serviceArns;
  }

  async describeServices(
    clusterId: string,
    serviceNames: string[]
  ): Promise<Service[]> {
    debug('describing ECS services: %j', [clusterId, serviceNames]);
    const response = await this.ecs().describeServices({
      cluster: clusterId,
      services: serviceNames,
    });
    debug('described ECS services');
    return response.services;
  }

  async describeService(
    clusterId: string,
    serviceName: string
  ): Promise<Service> {
    const services = await this.describeServices(clusterId, [serviceName]);
    if (services.length == 0) {
      throw new Error(
        `ECS service not found: cluster: ${clusterId}, service: ${serviceName}`
      );
    }
    return services[0];
  }

  async describeContainerInstances(
    clusterId: string,
    containerInstanceIds: string[]
  ): Promise<ContainerInstance[]> {
    debug('describing container instances: %j', [
      clusterId,
      containerInstanceIds,
    ]);
    const response = await this.ecs().describeContainerInstances({
      containerInstances: containerInstanceIds,
      cluster: clusterId,
    });
    debug('described container instances');
    return response.containerInstances;
  }

  async describeContainerInstance(
    clusterId: string,
    containerInstanceId: string
  ): Promise<ContainerInstance> {
    const instances = await this.describeContainerInstances(clusterId, [
      containerInstanceId,
    ]);
    if (instances.length == 0) {
      throw new Error(
        `Container instance not found: cluster: ${clusterId}, instance: ${containerInstanceId}`
      );
    }
    return instances[0];
  }
}
