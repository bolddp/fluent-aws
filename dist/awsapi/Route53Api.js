"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Route53Api = void 0;
const client_route_53_1 = require("@aws-sdk/client-route-53");
const debug = require('debug')('fluentaws:Route53Api');
class Route53Api {
    constructor(config) {
        this.config = config;
        this.route53 = () => new client_route_53_1.Route53(this.config);
    }
    listHealthChecks() {
        return __awaiter(this, void 0, void 0, function* () {
            debug('getting all health checks');
            const response = yield this.route53().listHealthChecks({});
            debug('got all health checks: count = %d', response.HealthChecks.length);
            return response.HealthChecks;
        });
    }
    getHealthCheck(id) {
        return __awaiter(this, void 0, void 0, function* () {
            debug('getting health check: %s', id);
            const response = yield this.route53().getHealthCheck({ HealthCheckId: id });
            if (!response.HealthCheck) {
                throw new Error(`health check not found: ${id}`);
            }
            debug('got health check');
            return response.HealthCheck;
        });
    }
    createHealthCheck(request) {
        return __awaiter(this, void 0, void 0, function* () {
            debug('creating health check: %j', request);
            const response = yield this.route53().createHealthCheck(request);
            debug('created health check: %j', response.HealthCheck);
            return response.HealthCheck;
        });
    }
    deleteHealthCheck(id) {
        return __awaiter(this, void 0, void 0, function* () {
            debug('deleting health check: %s', id);
            yield this.route53().deleteHealthCheck({ HealthCheckId: id });
            debug('deleted health check');
        });
    }
    listHostedZones() {
        return __awaiter(this, void 0, void 0, function* () {
            debug('getting all hosted zones');
            const response = yield this.route53().listHostedZones({});
            debug('got all hosted zones: count = %d', response.HostedZones.length);
            return response.HostedZones;
        });
    }
    getHostedZone(id) {
        return __awaiter(this, void 0, void 0, function* () {
            debug('getting hosted zone: %s', id);
            const response = yield this.route53().getHostedZone({
                Id: id,
            });
            debug('got hosted zone');
            return response.HostedZone;
        });
    }
    listRecordSets(hostedZoneId) {
        return __awaiter(this, void 0, void 0, function* () {
            debug('getting record sets: %s', hostedZoneId);
            const response = yield this.route53().listResourceRecordSets({
                HostedZoneId: hostedZoneId,
            });
            debug('got record sets');
            return response.ResourceRecordSets;
        });
    }
    createRecordSet(hostedZoneId, recordSet) {
        return __awaiter(this, void 0, void 0, function* () {
            debug('creating record set: %s, %j', hostedZoneId, recordSet);
            const change = {
                Action: 'CREATE',
                ResourceRecordSet: recordSet,
            };
            const changeBatch = {
                Changes: [change],
            };
            yield this.route53().changeResourceRecordSets({
                HostedZoneId: hostedZoneId,
                ChangeBatch: changeBatch,
            });
            debug('created record set');
        });
    }
    deleteRecordSet(hostedZoneId, recordSet) {
        return __awaiter(this, void 0, void 0, function* () {
            debug('deleting record set: %s, %j', hostedZoneId, recordSet);
            const change = {
                Action: 'DELETE',
                ResourceRecordSet: recordSet,
            };
            const changeBatch = {
                Changes: [change],
            };
            yield this.route53().changeResourceRecordSets({
                HostedZoneId: hostedZoneId,
                ChangeBatch: changeBatch,
            });
            debug('deleted record set');
        });
    }
}
exports.Route53Api = Route53Api;
