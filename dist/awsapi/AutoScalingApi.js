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
exports.AutoScalingApi = void 0;
const client_auto_scaling_1 = require("@aws-sdk/client-auto-scaling");
const debug = require('debug')('fluentaws:AutoScalingApi');
class AutoScalingApi {
    constructor(config) {
        this.config = config;
        this.autoScaling = () => new client_auto_scaling_1.AutoScaling(this.config);
    }
    describeGroups(idOrArns) {
        return __awaiter(this, void 0, void 0, function* () {
            debug('describing auto scaling groups: %j', idOrArns || {});
            const response = yield this.autoScaling().describeAutoScalingGroups({
                AutoScalingGroupNames: idOrArns,
            });
            debug('described auto scaling groups');
            return response.AutoScalingGroups;
        });
    }
    describeGroup(idOrArn) {
        return __awaiter(this, void 0, void 0, function* () {
            const autoScalingGroups = yield this.describeGroups([idOrArn]);
            if (autoScalingGroups.length == 0) {
                throw new Error(`autoscaling group not found: ${idOrArn}`);
            }
            return autoScalingGroups[0];
        });
    }
    update(updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.autoScaling().updateAutoScalingGroup(updateData);
        });
    }
    setInstanceProtection(idOrArn, instanceIds, value) {
        return __awaiter(this, void 0, void 0, function* () {
            debug('setting instance proection: %s, instances: %j, value: %b', idOrArn, instanceIds, value);
            yield this.autoScaling().setInstanceProtection({
                AutoScalingGroupName: idOrArn,
                InstanceIds: instanceIds,
                ProtectedFromScaleIn: value,
            });
            debug('set instance protection');
        });
    }
}
exports.AutoScalingApi = AutoScalingApi;
