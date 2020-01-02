"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ApiNode_1 = require("../node/ApiNode");
const ApiNodeFactory_1 = require("../node/ApiNodeFactory");
class Route53 extends ApiNode_1.ApiNode {
    constructor(parent) {
        super(parent);
        this.healthCheckCollection = ApiNodeFactory_1.ApiNodeFactory.route53HealthCheckCollection(this);
        this.hostedZoneCollection = ApiNodeFactory_1.ApiNodeFactory.route53HostedZoneCollection(this);
    }
    healthChecks() {
        return this.healthCheckCollection;
    }
    healthCheck(id) {
        return this.healthCheckCollection.getById(id);
    }
    hostedZones() {
        return this.hostedZoneCollection;
    }
    hostedZone(id) {
        return this.hostedZoneCollection.getById(id);
    }
}
exports.Route53 = Route53;
