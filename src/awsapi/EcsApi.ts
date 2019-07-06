import * as AWS from 'aws-sdk';

const debug = require('debug')('fluentaws:EcsApi');

export class EcsApi {
  ecs = () => new AWS.ECS();

  async listClusters(): Promise<string[]> {
    debug('listing ECS clusters');
    const response = await this.ecs().listClusters().promise();
    debug('listed ECS clusters');
    return response.clusterArns;
  }

  async describeClusters(idOrArns?: string[]): Promise<AWS.ECS.Cluster[]> {
    debug('describing ECS clusters: %j', idOrArns || {});
    const response = await this.ecs().describeClusters({
      clusters: idOrArns
    }).promise();
    debug('described ECS clusters');
    return response.clusters;
  }

  async describeCluster(idOrArn: string): Promise<AWS.ECS.Cluster> {
    const clusters = await this.describeClusters();
    if (clusters.length == 0) {
      throw new Error(`cluster not found: ${idOrArn}`);
    }
    return clusters[0];
  }

  async listTasks(clusterId: string): Promise<string[]> {
    const response = await this.ecs().listTasks({ cluster: clusterId }).promise();
    return response.taskArns;
  }

  async describeTasks(clusterId: string, idOrArns: string[]): Promise<AWS.ECS.Task[]> {
    debug('describing ECS tasks: %j', [clusterId, idOrArns]);
    const response = await this.ecs().describeTasks({
      cluster: clusterId,
      tasks: idOrArns
    }).promise();
    debug('described ECS tasks');
    return response.tasks;
  }

  async describeTask(clusterId: string, idOrArn: string): Promise<AWS.ECS.Task> {
    const tasks = await this.describeTasks(clusterId, [idOrArn])
    if (tasks.length == 0) {
      throw new Error(`task not found: ${idOrArn}`);
    }
    return tasks[0];
  }

  async listServices(clusterId: string): Promise<string[]> {
    debug('listing ECS cluster services: %s', clusterId);
    const response = await this.ecs().listServices({
      cluster: clusterId,
      maxResults: 100
    }).promise();
    debug('listed ECS cluster services');
    return response.serviceArns;
  }

  async describeServices(clusterId: string, serviceNames: string[]): Promise<AWS.ECS.Service[]> {
    debug('describing ECS services: %j', [clusterId, serviceNames]);
    const response = await this.ecs().describeServices({
      cluster: clusterId,
      services: serviceNames
    }).promise();
    debug('described ECS services');
    return response.services;
  }

  async describeService(clusterId: string, serviceName: string): Promise<AWS.ECS.Service> {
    const services = await this.describeServices(clusterId, [serviceName]);
    if (services.length == 0) {
      throw new Error(`ECS service not found: cluster: ${clusterId}, service: ${serviceName}`);
    }
    return services[0];
  }

  async describeContainerInstances(clusterId: string, containerInstanceIds: string[]): Promise<AWS.ECS.ContainerInstance[]> {
    debug('describing container instances: %j', [clusterId, containerInstanceIds]);
    const response = await this.ecs().describeContainerInstances({
      containerInstances: containerInstanceIds,
      cluster: clusterId
    }).promise();
    debug('described container instances');
    return response.containerInstances;
  }

  async describeContainerInstance(clusterId: string, containerInstanceId: string): Promise<AWS.ECS.ContainerInstance> {
    const instances = await this.describeContainerInstances(clusterId, [ containerInstanceId ]);
    if (instances.length == 0) {
      throw new Error(`Container instance not found: cluster: ${clusterId}, instance: ${containerInstanceId}`);
    }
    return instances[0];
  }
}