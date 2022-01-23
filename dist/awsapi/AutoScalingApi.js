"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const AWS = __importStar(require("aws-sdk"));
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
