import { Route53HostedZoneCollection } from './Route53HostedZoneCollection';
import { ApiNode } from "../node/ApiNode";
import { Route53HealthCheckCollection } from "./Route53HealthCheckCollection";
import { Route53HealthCheck } from "./Route53HealthCheck";
import { Route53HostedZone } from './Route53HostedZone';
export declare class Route53 extends ApiNode {
    healthCheckCollection: Route53HealthCheckCollection;
    hostedZoneCollection: Route53HostedZoneCollection;
    constructor(parent: ApiNode);
    healthChecks(): Route53HealthCheckCollection;
    healthCheck(id: string): Route53HealthCheck;
    hostedZones(): Route53HostedZoneCollection;
    hostedZone(id: string): Route53HostedZone;
}
