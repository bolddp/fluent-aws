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
const SystemsManagerApi_1 = require("./SystemsManagerApi");
const CloudFormationApi_1 = require("./CloudFormationApi");
const AWS = require("aws-sdk");
const S3Api_1 = require("./S3Api");
const Ec2Api_1 = require("./Ec2Api");
const AutoScalingApi_1 = require("./AutoScalingApi");
const EcsApi_1 = require("./EcsApi");
const IamApi_1 = require("./IamApi");
const Route53Api_1 = require("./Route53Api");
const DynamoDbApi_1 = require("./DynamoDbApi");
const StsApi_1 = require("./StsApi");
const KmsApi_1 = require("./KmsApi");
const CognitoApi_1 = require("./CognitoApi");
const debug = require('debug')('fluentaws:AwsApi');
/**
 * API for AWS services, using the regular Javascript AWS SDK to wrap requests
 * that are needed by the module.
 */
class AwsApi {
}
exports.AwsApi = AwsApi;
AwsApi.autoScaling = new AutoScalingApi_1.AutoScalingApi();
AwsApi.cloudFormation = new CloudFormationApi_1.CloudFormationApi();
AwsApi.cognito = new CognitoApi_1.CognitoApi();
AwsApi.dynamoDb = new DynamoDbApi_1.DynamoDbApi();
AwsApi.ec2 = new Ec2Api_1.Ec2Api();
AwsApi.ecs = new EcsApi_1.EcsApi();
AwsApi.iam = new IamApi_1.IamApi();
AwsApi.kms = new KmsApi_1.KmsApi();
AwsApi.route53 = new Route53Api_1.Route53Api();
AwsApi.s3 = new S3Api_1.S3Api();
AwsApi.sts = new StsApi_1.StsApi();
AwsApi.systemsManager = new SystemsManagerApi_1.SystemsManagerApi();
AwsApi.configure = (config) => {
    debug('applying configuration: %j', config);
    AWS.config.update(config);
};
AwsApi.profile = (profile) => {
    debug('applying profile: %s', profile);
    var credentials = new AWS.SharedIniFileCredentials({ profile });
    AWS.config.credentials = credentials;
};
AwsApi.assumeRole = (roleArn, sessionName) => __awaiter(void 0, void 0, void 0, function* () {
    debug('assuming role: %s, session name: %s', roleArn, sessionName);
    yield AwsApi.sts.assumeRole(roleArn, sessionName);
    debug('assumed role: %s, session name: %s', roleArn, sessionName);
});
