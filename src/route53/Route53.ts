import { Route53HostedZoneCollection } from './Route53HostedZoneCollection';
import { ApiNode } from "../node/ApiNode";
import { Route53HealthCheckCollection } from "./Route53HealthCheckCollection";
import { ApiNodeFactory } from '../node/ApiNodeFactory';
import { Route53HealthCheck } from "./Route53HealthCheck";
import { Route53HostedZone } from './Route53HostedZone';

export class Route53 extends ApiNode {
  healthCheckCollection: Route53HealthCheckCollection;
  hostedZoneCollection: Route53HostedZoneCollection;

  constructor(parent: ApiNode) {
    super(parent);
    this.healthCheckCollection = ApiNodeFactory.route53HealthCheckCollection(this);
    this.hostedZoneCollection = ApiNodeFactory.route53HostedZoneCollection(this);
  }

  healthChecks(): Route53HealthCheckCollection {
    return this.healthCheckCollection;
  }

  healthCheck(id: string): Route53HealthCheck {
    return this.healthCheckCollection.getById(id);
  }

  hostedZones(): Route53HostedZoneCollection {
    return this.hostedZoneCollection;
  }

  hostedZone(id: string): Route53HostedZone {
    return this.hostedZoneCollection.getById(id);
  }
}