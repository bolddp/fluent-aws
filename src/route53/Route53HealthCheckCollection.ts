import { ApiNodeCollection } from '../node/ApiNodeCollection';
import { Route53HealthCheck } from './Route53HealthCheck';
import { ApiNodeFactory } from '../node/ApiNodeFactory';
import { AwsApi } from '../awsapi/AwsApi';

export class Route53HealthCheckCollection extends ApiNodeCollection<Route53HealthCheck, AWS.Route53.HealthCheck> {
  apiNodeFromAwsData(awsData: AWS.Route53.HealthCheck): Route53HealthCheck {
    return ApiNodeFactory.route53HealthCheck(this, awsData.Id, awsData);
  }

  apiNodeFromId(id: string): Route53HealthCheck {
    return ApiNodeFactory.route53HealthCheck(this, id);
  }

  load(): Promise<AWS.Route53.HealthCheck[]> {
    return AwsApi.route53.getAllHealthChecks();
  }

  /**
   * Creates a new health check and returns its AWS data on success.
   */
  async create(request: AWS.Route53.CreateHealthCheckRequest): Promise<Route53HealthCheck> {
    const healthCheck = await AwsApi.route53.createHealthCheck(request);
    const apiNode = ApiNodeFactory.route53HealthCheck(this, healthCheck.Id, healthCheck);
    this.nodeMap.set(healthCheck.Id, apiNode);
    return apiNode;
  }
}