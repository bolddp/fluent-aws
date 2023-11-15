import { ApiNodeCollection } from '../node/ApiNodeCollection';
import { ApiNodeFactory } from '../node/ApiNodeFactory';
import { ApiNode } from '../node/ApiNode';
import { EcsService } from './EcsService';
import { AwsApi } from '../awsapi/AwsApi';
import { Service } from '@aws-sdk/client-ecs';

export class EcsServiceCollection extends ApiNodeCollection<
  EcsService,
  Service
> {
  clusterId: string;

  constructor(parent: ApiNode, clusterId: string) {
    super(parent);
    this.clusterId = clusterId;
  }

  apiNodeFromAwsData(awsData: Service): EcsService {
    return ApiNodeFactory.ecsService(this, this.clusterId, awsData.serviceName);
  }

  apiNodeFromId(id: string): EcsService {
    return ApiNodeFactory.ecsService(this, this.clusterId, id);
  }

  async load(): Promise<Service[]> {
    const serviceArns = await AwsApi.ecs(this.config()).listServices(
      this.clusterId
    );
    return AwsApi.ecs(this.config()).describeServices(
      this.clusterId,
      serviceArns
    );
  }
}
