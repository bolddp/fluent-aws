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
exports.EcsApi = void 0;
const client_ecs_1 = require("@aws-sdk/client-ecs");
const debug = require('debug')('fluentaws:EcsApi');
class EcsApi {
    constructor(config) {
        this.config = config;
        this.ecs = () => new client_ecs_1.ECS(this.config);
    }
    listClusters() {
        return __awaiter(this, void 0, void 0, function* () {
            debug('listing ECS clusters');
            const response = yield this.ecs().listClusters({});
            debug('listed ECS clusters');
            return response.clusterArns;
        });
    }
    describeClusters(idOrArns) {
        return __awaiter(this, void 0, void 0, function* () {
            debug('describing ECS clusters: %j', idOrArns || {});
            const response = yield this.ecs().describeClusters({
                clusters: idOrArns,
            });
            debug('described ECS clusters');
            return response.clusters;
        });
    }
    describeCluster(idOrArn) {
        return __awaiter(this, void 0, void 0, function* () {
            const clusters = yield this.describeClusters();
            if (clusters.length == 0) {
                throw new Error(`Cluster not found: ${idOrArn}`);
            }
            return clusters[0];
        });
    }
    listTasks(clusterId) {
        return __awaiter(this, void 0, void 0, function* () {
            debug('listing ECS tasks: %s', clusterId);
            const response = yield this.ecs().listTasks({ cluster: clusterId });
            debug('listed ECS tasks');
            return response.taskArns;
        });
    }
    describeTasks(clusterId, idOrArns) {
        return __awaiter(this, void 0, void 0, function* () {
            debug('describing ECS tasks: %j', [clusterId, idOrArns]);
            const response = yield this.ecs().describeTasks({
                cluster: clusterId,
                tasks: idOrArns,
            });
            debug('described ECS tasks');
            return response.tasks;
        });
    }
    describeTask(clusterId, idOrArn) {
        return __awaiter(this, void 0, void 0, function* () {
            const tasks = yield this.describeTasks(clusterId, [idOrArn]);
            if (tasks.length == 0) {
                throw new Error(`Task not found: ${idOrArn}`);
            }
            return tasks[0];
        });
    }
    listServices(clusterId) {
        return __awaiter(this, void 0, void 0, function* () {
            debug('listing ECS cluster services: %s', clusterId);
            const response = yield this.ecs().listServices({
                cluster: clusterId,
                maxResults: 100,
            });
            debug('listed ECS cluster services');
            return response.serviceArns;
        });
    }
    describeServices(clusterId, serviceNames) {
        return __awaiter(this, void 0, void 0, function* () {
            debug('describing ECS services: %j', [clusterId, serviceNames]);
            const response = yield this.ecs().describeServices({
                cluster: clusterId,
                services: serviceNames,
            });
            debug('described ECS services');
            return response.services;
        });
    }
    describeService(clusterId, serviceName) {
        return __awaiter(this, void 0, void 0, function* () {
            const services = yield this.describeServices(clusterId, [serviceName]);
            if (services.length == 0) {
                throw new Error(`ECS service not found: cluster: ${clusterId}, service: ${serviceName}`);
            }
            return services[0];
        });
    }
    describeContainerInstances(clusterId, containerInstanceIds) {
        return __awaiter(this, void 0, void 0, function* () {
            debug('describing container instances: %j', [
                clusterId,
                containerInstanceIds,
            ]);
            const response = yield this.ecs().describeContainerInstances({
                containerInstances: containerInstanceIds,
                cluster: clusterId,
            });
            debug('described container instances');
            return response.containerInstances;
        });
    }
    describeContainerInstance(clusterId, containerInstanceId) {
        return __awaiter(this, void 0, void 0, function* () {
            const instances = yield this.describeContainerInstances(clusterId, [
                containerInstanceId,
            ]);
            if (instances.length == 0) {
                throw new Error(`Container instance not found: cluster: ${clusterId}, instance: ${containerInstanceId}`);
            }
            return instances[0];
        });
    }
}
exports.EcsApi = EcsApi;
