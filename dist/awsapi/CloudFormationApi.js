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
exports.CloudFormationApi = void 0;
const AWS = __importStar(require("aws-sdk"));
const debug = require('debug')('fluentaws:CloudFormationApi');
class CloudFormationApi {
    constructor(config) {
        this.cf = () => new AWS.CloudFormation(this.config);
        this.config = config;
    }
    describeStacks() {
        return __awaiter(this, void 0, void 0, function* () {
            debug('describing stacks');
            let result = [];
            // Perform the call in a function since we may need to recursively call it
            const recursiveFunction = (nextToken) => __awaiter(this, void 0, void 0, function* () {
                const response = yield this.cf()
                    .describeStacks(nextToken ? { NextToken: nextToken } : {}).promise();
                result = result.concat(response.Stacks);
                if (response.NextToken) {
                    yield recursiveFunction(response.NextToken);
                }
            });
            yield recursiveFunction();
            debug('described stacks');
            return result;
        });
    }
    describeStack(stackName) {
        return __awaiter(this, void 0, void 0, function* () {
            debug('describing stack: %s', stackName);
            const response = yield this.cf().describeStacks({
                StackName: stackName
            }).promise();
            if (response.Stacks.length == 0) {
                throw new Error(`Stack not found: ${stackName}`);
            }
            debug('described stack');
            return response.Stacks[0];
        });
    }
    detectStackDrift(stackName) {
        return __awaiter(this, void 0, void 0, function* () {
            debug('detecting stack drift: %s', stackName);
            const response = yield this.cf().detectStackDrift({
                StackName: stackName
            }).promise();
            debug('detected stack drift');
            return response.StackDriftDetectionId;
        });
    }
    describeStackDriftDetectionStatus(driftDetectionId) {
        return __awaiter(this, void 0, void 0, function* () {
            debug('describing StackDriftDetectionStatus: %s', driftDetectionId);
            const response = yield this.cf().describeStackDriftDetectionStatus({
                StackDriftDetectionId: driftDetectionId
            }).promise();
            debug('described StackDriftDetectionStatus');
            return response.DetectionStatus;
        });
    }
    describeStackResourceDrifts(stackName) {
        return __awaiter(this, void 0, void 0, function* () {
            debug('describing StackResourceDrifts: %s', stackName);
            const response = yield this.cf().describeStackResourceDrifts({
                StackName: stackName
            }).promise();
            debug('described StackResourceDrifts');
            return response.StackResourceDrifts;
        });
    }
    listStackResources(stackName) {
        return __awaiter(this, void 0, void 0, function* () {
            debug('listing stack resources: %s', stackName);
            let result = [];
            const recursiveFunction = (nextToken) => __awaiter(this, void 0, void 0, function* () {
                const response = yield this.cf().listStackResources({
                    StackName: stackName,
                    NextToken: nextToken
                }).promise();
                result = result.concat(response.StackResourceSummaries);
                if (response.NextToken) {
                    yield recursiveFunction(response.NextToken);
                }
            });
            yield recursiveFunction();
            debug('listed stack resources');
            return result;
        });
    }
    getTemplate(stackName, templateStage = 'Processed') {
        return __awaiter(this, void 0, void 0, function* () {
            debug('getting stack template: %s', stackName);
            const response = yield this.cf().getTemplate({
                StackName: stackName,
                TemplateStage: templateStage
            }).promise();
            debug('got stack template');
            return response.TemplateBody;
        });
    }
}
exports.CloudFormationApi = CloudFormationApi;
