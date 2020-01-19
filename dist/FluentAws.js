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
const fetch = require("node-fetch");
const PromiseChain_1 = require("./node/PromiseChain");
const ApiNode_1 = require("./node/ApiNode");
const ApiNodeFactory_1 = require("./node/ApiNodeFactory");
const AwsApi_1 = require("./awsapi/AwsApi");
global['fetch'] = fetch;
class FluentAws extends ApiNode_1.ApiNode {
    constructor() {
        super(undefined);
        this.promiseChain = new PromiseChain_1.PromiseChain();
        this.autoScalingInstance = ApiNodeFactory_1.ApiNodeFactory.autoScaling(this);
        this.cloudFormationInstance = ApiNodeFactory_1.ApiNodeFactory.cloudFormation(this);
        this.cognitoInstance = ApiNodeFactory_1.ApiNodeFactory.cognito(this);
        this.dynamoDbInstance = ApiNodeFactory_1.ApiNodeFactory.dynamoDb(this);
        this.ecsInstance = ApiNodeFactory_1.ApiNodeFactory.ecs(this);
        this.ec2Instance = ApiNodeFactory_1.ApiNodeFactory.ec2(this);
        this.kmsInstance = ApiNodeFactory_1.ApiNodeFactory.kms(this);
        this.route53Instance = ApiNodeFactory_1.ApiNodeFactory.route53(this);
        this.s3Instance = ApiNodeFactory_1.ApiNodeFactory.s3(this);
        this.snsInstance = ApiNodeFactory_1.ApiNodeFactory.sns(this);
        this.systemsManagerInstance = ApiNodeFactory_1.ApiNodeFactory.systemsManager(this);
    }
    sdk() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.ensureResolved();
            return AWS;
        });
    }
    /**
     * Reference to the AWS SDK instance that FluentAws uses. This reference can be used to access the
     * raw AWS SDK, honoring the configuration that you have performed through the FluentAws API and
     * allowing for mixing AWS API calls through FluentAws and the raw AWS SDK.
     */
    configure(config) {
        this.config = config;
        this.configurePromise = this.promiseChain.replaceVolatile(this.configurePromise, () => __awaiter(this, void 0, void 0, function* () {
            const fluentAwsConfig = {
                region: config.region
            };
            AwsApi_1.AwsApi.configure(fluentAwsConfig);
        }));
        return this;
    }
    profile(profile) {
        this.profilePromise = this.promiseChain.replace(this.profilePromise, () => __awaiter(this, void 0, void 0, function* () {
            AwsApi_1.AwsApi.profile(profile);
        }));
        return this;
    }
    /**
     * Makes sure that the FluentAws instance assumes a role before attempting to access AWS resources.
     * The command can be repeated periodically to ensure that the assumed role doesn't expire.
     */
    assumeRole(roleArn, sessionName) {
        this.assumeRolePromise = this.promiseChain.replace(this.assumeRolePromise, () => AwsApi_1.AwsApi.assumeRole(roleArn, sessionName));
        return this;
    }
    autoScaling() { return this.autoScalingInstance; }
    cloudFormation() { return this.cloudFormationInstance; }
    cognito() { return this.cognitoInstance; }
    dynamoDb() { return this.dynamoDbInstance; }
    ecs() { return this.ecsInstance; }
    ec2() { return this.ec2Instance; }
    kms() { return this.kmsInstance; }
    route53() { return this.route53Instance; }
    s3() { return this.s3Instance; }
    sns() { return this.snsInstance; }
    systemsManager() { return this.systemsManagerInstance; }
}
exports.FluentAws = FluentAws;
const fluentAwsInstances = new Map();
function aws(name) {
    const instanceName = name || 'default';
    let instance = fluentAwsInstances.get(instanceName);
    if (!instance) {
        instance = new FluentAws();
        fluentAwsInstances.set(instanceName, instance);
    }
    return instance;
}
exports.aws = aws;
