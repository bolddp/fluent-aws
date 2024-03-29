import { ApiNodeCollection } from '../node/ApiNodeCollection';
import { Route53HealthCheck } from './Route53HealthCheck';
import { ApiNodeFactory } from '../node/ApiNodeFactory';
import { AwsApi } from '../awsapi/AwsApi';
import {
  CreateHealthCheckRequest,
  HealthCheck,
} from '@aws-sdk/client-route-53';

export class Route53HealthCheckCollection extends ApiNodeCollection<
  Route53HealthCheck,
  HealthCheck
> {
  apiNodeFromAwsData(awsData: HealthCheck): Route53HealthCheck {
    return ApiNodeFactory.route53HealthCheck(this, awsData.Id);
  }

  apiNodeFromId(id: string): Route53HealthCheck {
    return ApiNodeFactory.route53HealthCheck(this, id);
  }

  load(): Promise<HealthCheck[]> {
    return AwsApi.route53(this.config()).listHealthChecks();
  }

  /**
   * Creates a new health check and returns its AWS data on success.
   */
  async create(request: CreateHealthCheckRequest): Promise<Route53HealthCheck> {
    const healthCheck = await AwsApi.route53(this.config()).createHealthCheck(
      request
    );
    const apiNode = ApiNodeFactory.route53HealthCheck(this, healthCheck.Id);
    this.nodeMap.set(healthCheck.Id, apiNode);
    return apiNode;
  }
}
