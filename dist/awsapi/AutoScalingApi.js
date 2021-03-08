"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const AWS = require("aws-sdk");
const debug = require('debug')('fluentaws:AutoScalingApi');
class AutoScalingApi {
    constructor(config) {
        this.autoScaling = () => new AWS.AutoScaling(this.config);
        this.config = config;
    }
    describeGroups(idOrArns) {
        return __awaiter(this, void 0, void 0, function* () {
            debug('describing auto scaling groups: %j', idOrArns || {});
            const response = yield this.autoScaling().describeAutoScalingGroups({
                AutoScalingGroupNames: idOrArns
            }).promise();
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
            yield this.autoScaling().updateAutoScalingGroup(updateData).promise();
        });
    }
    setInstanceProtection(idOrArn, instanceIds, value) {
        return __awaiter(this, void 0, void 0, function* () {
            debug('setting instance proection: %s, instances: %j, value: %b', idOrArn, instanceIds, value);
            yield this.autoScaling().setInstanceProtection({
                AutoScalingGroupName: idOrArn,
                InstanceIds: instanceIds,
                ProtectedFromScaleIn: value
            }).promise();
            debug('set instance protection');
        });
    }
}
exports.AutoScalingApi = AutoScalingApi;
