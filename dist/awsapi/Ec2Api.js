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
const AWS = require("aws-sdk");
const debug = require('debug')('fluentaws:Ec2Api');
class Ec2Api {
    constructor() {
        this.ec2 = () => new AWS.EC2();
    }
    describeInstances(instanceIds) {
        return __awaiter(this, void 0, void 0, function* () {
            debug('describing instances: %j', instanceIds || {});
            const response = yield this.ec2().describeInstances({
                InstanceIds: instanceIds
            }).promise();
            const result = [];
            for (const res of response.Reservations) {
                for (const ins of res.Instances) {
                    result.push(ins);
                }
            }
            debug('described instances');
            return result;
        });
    }
    /**
     * Loads AWS information about one EC2 instance. If the instance is not found,
     * an error is thrown.
     */
    describeInstance(instanceId) {
        return __awaiter(this, void 0, void 0, function* () {
            const instances = yield this.describeInstances([instanceId]);
            if (instances.length == 0) {
                throw new Error(`Instance not found: ${instanceId}`);
            }
            return instances[0];
        });
    }
    describeAccountAttributes() {
        return __awaiter(this, void 0, void 0, function* () {
            debug('describing account attributes');
            const response = yield this.ec2().describeAccountAttributes().promise();
            debug('described account attributes');
            return response.AccountAttributes;
        });
    }
}
exports.Ec2Api = Ec2Api;
