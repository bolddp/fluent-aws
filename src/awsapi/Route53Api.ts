import * as AWS from 'aws-sdk';

const debug = require('debug')('fluentaws:Route53Api');

export class Route53Api {
  route53 = () => new AWS.Route53();

  async getAllHealthChecks(): Promise<AWS.Route53.HealthCheck[]> {
    debug('getting all health checks');
    const response = await this.route53().listHealthChecks().promise();
    debug('got all health checks: count = %d', response.HealthChecks.length);
    return response.HealthChecks;
  }

  async getHealthCheck(id: string): Promise<AWS.Route53.HealthCheck> {
    debug('getting health check: %s', id);
    const response = await this.route53().getHealthCheck({ HealthCheckId: id }).promise();
    if (!response.HealthCheck) {
      throw new Error(`health check not found: ${id}`);
    }
    debug('got health check');
    return response.HealthCheck;
  }

  async createHealthCheck(request: AWS.Route53.CreateHealthCheckRequest): Promise<AWS.Route53.HealthCheck> {
    debug('creating health check: %j', request);
    const response = await this.route53().createHealthCheck(request).promise();
    debug('created health check: %j', response.HealthCheck);
    return response.HealthCheck;
  }

  async deleteHealthCheck(id: string): Promise<void> {
    debug('deleting health check: %s', id);
    await this.route53().deleteHealthCheck({ HealthCheckId: id }).promise();
    debug('deleted health check');
  }
}