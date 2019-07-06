import { ApiNode } from "../node/ApiNode";
import { Route53HealthCheckCollection } from "./Route53HealthCheckCollection";
import { ApiNodeFactory } from '../node/ApiNodeFactory';
import { Route53HealthCheck } from "./Route53HealthCheck";

export class Route53 extends ApiNode {
  healthCheckCollection: Route53HealthCheckCollection;

  constructor(parent: ApiNode) {
    super(parent);
    this.healthCheckCollection = ApiNodeFactory.route53HealthCheckCollection(this);
  }

  healthChecks(): Route53HealthCheckCollection {
    return this.healthCheckCollection;
  }

  healthCheck(id: string): Route53HealthCheck {
    return this.healthCheckCollection.getById(id);
  }
}