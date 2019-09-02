import * as AWS from 'aws-sdk';

const debug = require('debug')('fluentaws:Route53Api');

export class Route53Api {
  route53 = () => new AWS.Route53();

  async listHealthChecks(): Promise<AWS.Route53.HealthCheck[]> {
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

  async listHostedZones(): Promise<AWS.Route53.HostedZone[]> {
    debug('getting all hosted zones');
    const response = await this.route53().listHostedZones().promise();
    debug('got all hosted zones: count = %d', response.HostedZones.length);
    return response.HostedZones;
  }

  async getHostedZone(id: string): Promise<AWS.Route53.HostedZone> {
    debug('getting hosted zone: %s', id);
    const response = await this.route53().getHostedZone({
      Id: id
    }).promise();
    debug('got hosted zone');
    return response.HostedZone;
  }

  async listRecordSets(hostedZoneId: string): Promise<AWS.Route53.ResourceRecordSet[]> {
    debug('getting record sets: %s', hostedZoneId);
    const response = await this.route53().listResourceRecordSets({
      HostedZoneId: hostedZoneId
    }).promise();
    debug('got record sets');
    return response.ResourceRecordSets;
  }

  async createRecordSet(hostedZoneId: string, recordSet: AWS.Route53.ResourceRecordSet): Promise<void> {
    debug('creating record set: %s, %j', hostedZoneId, recordSet);
    const change: AWS.Route53.Change = {
      Action: 'CREATE',
      ResourceRecordSet: recordSet
    }
    const changeBatch: AWS.Route53.ChangeBatch = {
      Changes: [change]
    };
    await this.route53().changeResourceRecordSets({
      HostedZoneId: hostedZoneId,
      ChangeBatch: changeBatch
    }).promise();
    debug('created record set');
  }

  async deleteRecordSet(hostedZoneId: string, recordSet: AWS.Route53.ResourceRecordSet): Promise<void> {
    debug('deleting record set: %s, %j', hostedZoneId, recordSet);
    const change: AWS.Route53.Change = {
      Action: 'DELETE',
      ResourceRecordSet: recordSet
    }
    const changeBatch: AWS.Route53.ChangeBatch = {
      Changes: [change]
    };
    await this.route53().changeResourceRecordSets({
      HostedZoneId: hostedZoneId,
      ChangeBatch: changeBatch
    }).promise();
    debug('deleted record set');
  }
}