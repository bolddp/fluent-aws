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
exports.aws = exports.FluentAws = void 0;
const AWS = __importStar(require("aws-sdk"));
const fetch = __importStar(require("node-fetch"));
const PromiseChain_1 = require("./node/PromiseChain");
const ApiNode_1 = require("./node/ApiNode");
const ApiNodeFactory_1 = require("./node/ApiNodeFactory");
const AwsApi_1 = require("./awsapi/AwsApi");
global['fetch'] = fetch;
const debug = require('debug')('fluentaws:FluentAws');
class FluentAws extends ApiNode_1.ApiNode {
    constructor() {
        super(undefined);
        this.configInstance = {};
        this.promiseChain = new PromiseChain_1.PromiseChain();
    }
    sdk(fnc) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ensureResolved();
            return fnc(AWS, this.configInstance);
        });
    }
    config() {
        return this.configInstance;
    }
    /**
     * Reference to the AWS SDK instance that FluentAws uses. This reference can be used to access the
     * raw AWS SDK, honoring the configuration that you have performed through the FluentAws API and
     * allowing for mixing AWS API calls through FluentAws and the raw AWS SDK.
     */
    region(region) {
        debug('setting region: %s', region);
        this.configInstance = Object.assign(Object.assign({}, this.configInstance), { region });
        return this;
    }
    profile(profile) {
        debug('setting profile: %s', profile);
        this.configInstance = Object.assign(Object.assign({}, this.configInstance), { credentials: new AWS.SharedIniFileCredentials({ profile }) });
        return this;
    }
    credentials(accessKeyId, secretAccessKey) {
        debug('setting credentials');
        this.configInstance = Object.assign(Object.assign({}, this.configInstance), { credentials: new AWS.Credentials({ accessKeyId, secretAccessKey }) });
        return this;
    }
    /**
     * Makes sure that the FluentAws instance assumes a role before attempting to access AWS resources.
     * The command can be repeated periodically to ensure that the assumed role doesn't expire.
     */
    assumeRole(roleArn, sessionName, durationSeconds) {
        this.assumeRolePromise = this.promiseChain.replace(this.assumeRolePromise, () => __awaiter(this, void 0, void 0, function* () {
            const credentials = yield AwsApi_1.AwsApi.sts(this.config()).assumeRole(roleArn, sessionName, durationSeconds !== null && durationSeconds !== void 0 ? durationSeconds : 3600);
            this.configInstance = Object.assign(Object.assign({}, this.configInstance), { credentials });
        }));
        return this;
    }
    /**
     * Makes the FluentAws instance assume a chain of roles before attempting to access AWS resources.
     */
    assumeRoles(roleArns, sessionNamePrefix, durationSeconds) {
        this.assumeRolePromise = this.promiseChain.replace(this.assumeRolePromise, () => __awaiter(this, void 0, void 0, function* () {
            let index = 1;
            for (const arn of roleArns) {
                const credentials = yield AwsApi_1.AwsApi.sts(this.config()).assumeRole(arn, `${sessionNamePrefix}-${index}`, durationSeconds !== null && durationSeconds !== void 0 ? durationSeconds : 3600);
                this.configInstance = Object.assign(Object.assign({}, this.configInstance), { credentials });
                index += 1;
            }
        }));
        return this;
    }
    autoScaling() {
        return ApiNodeFactory_1.ApiNodeFactory.autoScaling(this);
    }
    cloudFormation() {
        return ApiNodeFactory_1.ApiNodeFactory.cloudFormation(this);
    }
    cognito() {
        return ApiNodeFactory_1.ApiNodeFactory.cognito(this);
    }
    dynamoDb() {
        return ApiNodeFactory_1.ApiNodeFactory.dynamoDb(this);
    }
    ecs() {
        return ApiNodeFactory_1.ApiNodeFactory.ecs(this);
    }
    ec2() {
        return ApiNodeFactory_1.ApiNodeFactory.ec2(this);
    }
    kms() {
        return ApiNodeFactory_1.ApiNodeFactory.kms(this);
    }
    route53() {
        return ApiNodeFactory_1.ApiNodeFactory.route53(this);
    }
    s3() {
        return ApiNodeFactory_1.ApiNodeFactory.s3(this);
    }
    sns() {
        return ApiNodeFactory_1.ApiNodeFactory.sns(this);
    }
    systemsManager() {
        return ApiNodeFactory_1.ApiNodeFactory.systemsManager(this);
    }
}
exports.FluentAws = FluentAws;
const fluentAwsInstances = new Map();
function aws(name) {
    const instanceName = name || 'default';
    let instance = fluentAwsInstances.get(instanceName);
    if (!instance) {
        debug('creating instance: %s', instanceName);
        instance = new FluentAws();
        fluentAwsInstances.set(instanceName, instance);
    }
    return instance;
}
exports.aws = aws;
