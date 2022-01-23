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
exports.Ec2Api = void 0;
const AWS = __importStar(require("aws-sdk"));
const debug = require('debug')('fluentaws:Ec2Api');
class Ec2Api {
    constructor(config) {
        this.ec2 = () => new AWS.EC2(this.config);
        this.config = config;
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
