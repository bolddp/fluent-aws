import {
  Change,
  ChangeBatch,
  CreateHealthCheckRequest,
  HealthCheck,
  HostedZone,
  ResourceRecordSet,
  Route53,
} from '@aws-sdk/client-route-53';
import { FluentAwsConfig } from '../FluentAwsConfig';

const debug = require('debug')('fluentaws:Route53Api');

export class Route53Api {
  private route53 = () => new Route53(this.config);

  constructor(private config: FluentAwsConfig) {}

  async listHealthChecks(): Promise<HealthCheck[]> {
    debug('getting all health checks');
    const response = await this.route53().listHealthChecks({});
    debug('got all health checks: count = %d', response.HealthChecks.length);
    return response.HealthChecks;
  }

  async getHealthCheck(id: string): Promise<HealthCheck> {
    debug('getting health check: %s', id);
    const response = await this.route53().getHealthCheck({ HealthCheckId: id });
    if (!response.HealthCheck) {
      throw new Error(`health check not found: ${id}`);
    }
    debug('got health check');
    return response.HealthCheck;
  }

  async createHealthCheck(
    request: CreateHealthCheckRequest
  ): Promise<HealthCheck> {
    debug('creating health check: %j', request);
    const response = await this.route53().createHealthCheck(request);
    debug('created health check: %j', response.HealthCheck);
    return response.HealthCheck;
  }

  async deleteHealthCheck(id: string): Promise<void> {
    debug('deleting health check: %s', id);
    await this.route53().deleteHealthCheck({ HealthCheckId: id });
    debug('deleted health check');
  }

  async listHostedZones(): Promise<HostedZone[]> {
    debug('getting all hosted zones');
    const response = await this.route53().listHostedZones({});
    debug('got all hosted zones: count = %d', response.HostedZones.length);
    return response.HostedZones;
  }

  async getHostedZone(id: string): Promise<HostedZone> {
    debug('getting hosted zone: %s', id);
    const response = await this.route53().getHostedZone({
      Id: id,
    });
    debug('got hosted zone');
    return response.HostedZone;
  }

  async listRecordSets(hostedZoneId: string): Promise<ResourceRecordSet[]> {
    debug('getting record sets: %s', hostedZoneId);
    const response = await this.route53().listResourceRecordSets({
      HostedZoneId: hostedZoneId,
    });
    debug('got record sets');
    return response.ResourceRecordSets;
  }

  async createRecordSet(
    hostedZoneId: string,
    recordSet: ResourceRecordSet
  ): Promise<void> {
    debug('creating record set: %s, %j', hostedZoneId, recordSet);
    const change: Change = {
      Action: 'CREATE',
      ResourceRecordSet: recordSet,
    };
    const changeBatch: ChangeBatch = {
      Changes: [change],
    };
    await this.route53().changeResourceRecordSets({
      HostedZoneId: hostedZoneId,
      ChangeBatch: changeBatch,
    });
    debug('created record set');
  }

  async deleteRecordSet(
    hostedZoneId: string,
    recordSet: ResourceRecordSet
  ): Promise<void> {
    debug('deleting record set: %s, %j', hostedZoneId, recordSet);
    const change: Change = {
      Action: 'DELETE',
      ResourceRecordSet: recordSet,
    };
    const changeBatch: ChangeBatch = {
      Changes: [change],
    };
    await this.route53().changeResourceRecordSets({
      HostedZoneId: hostedZoneId,
      ChangeBatch: changeBatch,
    });
    debug('deleted record set');
  }
}
