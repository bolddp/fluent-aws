import { CreateHealthCheckRequest, HealthCheck, HostedZone, ResourceRecordSet } from '@aws-sdk/client-route-53';
import { FluentAwsConfig } from '../FluentAwsConfig';
export declare class Route53Api {
    private config;
    private route53;
    constructor(config: FluentAwsConfig);
    listHealthChecks(): Promise<HealthCheck[]>;
    getHealthCheck(id: string): Promise<HealthCheck>;
    createHealthCheck(request: CreateHealthCheckRequest): Promise<HealthCheck>;
    deleteHealthCheck(id: string): Promise<void>;
    listHostedZones(): Promise<HostedZone[]>;
    getHostedZone(id: string): Promise<HostedZone>;
    listRecordSets(hostedZoneId: string): Promise<ResourceRecordSet[]>;
    createRecordSet(hostedZoneId: string, recordSet: ResourceRecordSet): Promise<void>;
    deleteRecordSet(hostedZoneId: string, recordSet: ResourceRecordSet): Promise<void>;
}
