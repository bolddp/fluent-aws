import * as AWS from 'aws-sdk';
import { FluentAwsConfig } from '../FluentAwsConfig';
export declare class Route53Api {
    config: FluentAwsConfig;
    route53: () => AWS.Route53;
    constructor(config: FluentAwsConfig);
    listHealthChecks(): Promise<AWS.Route53.HealthCheck[]>;
    getHealthCheck(id: string): Promise<AWS.Route53.HealthCheck>;
    createHealthCheck(request: AWS.Route53.CreateHealthCheckRequest): Promise<AWS.Route53.HealthCheck>;
    deleteHealthCheck(id: string): Promise<void>;
    listHostedZones(): Promise<AWS.Route53.HostedZone[]>;
    getHostedZone(id: string): Promise<AWS.Route53.HostedZone>;
    listRecordSets(hostedZoneId: string): Promise<AWS.Route53.ResourceRecordSet[]>;
    createRecordSet(hostedZoneId: string, recordSet: AWS.Route53.ResourceRecordSet): Promise<void>;
    deleteRecordSet(hostedZoneId: string, recordSet: AWS.Route53.ResourceRecordSet): Promise<void>;
}
