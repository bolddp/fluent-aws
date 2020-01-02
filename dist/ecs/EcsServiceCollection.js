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
class EcsServiceCollection extends ApiNodeCollection_1.ApiNodeCollection {
    constructor(parent, clusterId) {
        super(parent);
        this.clusterId = clusterId;
    }
    apiNodeFromAwsData(awsData) {
        return ApiNodeFactory_1.ApiNodeFactory.ecsService(this, this.clusterId, awsData.serviceName);
    }
    apiNodeFromId(id) {
        return ApiNodeFactory_1.ApiNodeFactory.ecsService(this, this.clusterId, id);
    }
    load() {
        return __awaiter(this, void 0, void 0, function* () {
            const serviceArns = yield AwsApi_1.AwsApi.ecs.listServices(this.clusterId);
            return AwsApi_1.AwsApi.ecs.describeServices(this.clusterId, serviceArns);
        });
    }
}
exports.EcsServiceCollection = EcsServiceCollection;
