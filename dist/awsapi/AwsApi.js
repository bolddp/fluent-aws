"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AwsApi = void 0;
const SystemsManagerApi_1 = require("./SystemsManagerApi");
const CloudFormationApi_1 = require("./CloudFormationApi");
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
const SnsApi_1 = require("./SnsApi");
const debug = require('debug')('fluentaws:AwsApi');
/**
 * API for AWS services, using the regular Javascript AWS SDK to wrap requests
 * that are needed by the module.
 */
class AwsApi {
}
exports.AwsApi = AwsApi;
AwsApi.autoScaling = (config) => new AutoScalingApi_1.AutoScalingApi(config);
AwsApi.cloudFormation = (config) => new CloudFormationApi_1.CloudFormationApi(config);
AwsApi.cognito = (config) => new CognitoApi_1.CognitoApi(config);
AwsApi.dynamoDb = (config) => new DynamoDbApi_1.DynamoDbApi(config);
AwsApi.ec2 = (config) => new Ec2Api_1.Ec2Api(config);
AwsApi.ecs = (config) => new EcsApi_1.EcsApi(config);
AwsApi.iam = (config) => new IamApi_1.IamApi(config);
AwsApi.kms = (config) => new KmsApi_1.KmsApi(config);
AwsApi.route53 = (config) => new Route53Api_1.Route53Api(config);
AwsApi.s3 = (config) => new S3Api_1.S3Api(config);
AwsApi.sns = (config) => new SnsApi_1.SnsApi(config);
AwsApi.sts = (config) => new StsApi_1.StsApi(config);
AwsApi.systemsManager = (config) => new SystemsManagerApi_1.SystemsManagerApi(config);
