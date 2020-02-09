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
const ApiNodeCollection_1 = require("../node/ApiNodeCollection");
const ApiNodeFactory_1 = require("../node/ApiNodeFactory");
const AwsApi_1 = require("../awsapi/AwsApi");
class Route53HealthCheckCollection extends ApiNodeCollection_1.ApiNodeCollection {
    apiNodeFromAwsData(awsData) {
        return ApiNodeFactory_1.ApiNodeFactory.route53HealthCheck(this, awsData.Id);
    }
    apiNodeFromId(id) {
        return ApiNodeFactory_1.ApiNodeFactory.route53HealthCheck(this, id);
    }
    load() {
        return AwsApi_1.AwsApi.route53.listHealthChecks();
    }
    /**
     * Creates a new health check and returns its AWS data on success.
     */
    create(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const healthCheck = yield AwsApi_1.AwsApi.route53.createHealthCheck(request);
            const apiNode = ApiNodeFactory_1.ApiNodeFactory.route53HealthCheck(this, healthCheck.Id);
            this.nodeMap.set(healthCheck.Id, apiNode);
            return apiNode;
        });
    }
}
exports.Route53HealthCheckCollection = Route53HealthCheckCollection;
