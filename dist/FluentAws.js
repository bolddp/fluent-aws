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
        ;
        this.systemsManagerInstance = ApiNodeFactory_1.ApiNodeFactory.systemsManager(this);
    }
    sdk() {
        if (this.config) {
            AwsApi_1.AwsApi.configure(this.config);
        }
        return AWS;
    }
    /**
     * Reference to the AWS SDK instance that FluentAws uses. This reference can be used to access the
     * raw AWS SDK, honoring the configuration that you have performed through the FluentAws API and
     * allowing for mixing AWS API calls through FluentAws and the raw AWS SDK.
     */
    configure(config) {
        this.config = config;
        this.promiseChain.addVolatile(() => __awaiter(this, void 0, void 0, function* () {
            const fluentAwsConfig = {
                region: config.region
            };
            AwsApi_1.AwsApi.configure(fluentAwsConfig);
        }));
        return this;
    }
    profile(profile) {
        this.promiseChain.add(() => __awaiter(this, void 0, void 0, function* () {
            AwsApi_1.AwsApi.profile(profile);
        }));
        return this;
    }
    assumeRole(roleArn, sessionName) {
        this.promiseChain.add(() => AwsApi_1.AwsApi.assumeRole(roleArn, sessionName));
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
