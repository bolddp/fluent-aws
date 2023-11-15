"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiNodeFactory = void 0;
const KmsKeyCollection_1 = require("./../kms/KmsKeyCollection");
const SystemsManagerParameterCollection_1 = require("./../ssm/SystemsManagerParameterCollection");
const CloudFormationStack_1 = require("./../cf/CloudFormationStack");
const Route53RecordSetCollection_1 = require("./../route53/Route53RecordSetCollection");
const S3_1 = require("../s3/S3");
const Ecs_1 = require("../ecs/Ecs");
const Ec2_1 = require("../ec2/Ec2");
const S3Bucket_1 = require("../s3/S3Bucket");
const EcsCluster_1 = require("../ecs/EcsCluster");
const EcsTask_1 = require("../ecs/EcsTask");
const Ec2Instance_1 = require("../ec2/Ec2Instance");
const S3Object_1 = require("../s3/S3Object");
const AutoScaling_1 = require("../autoScaling/AutoScaling");
const AutoScalingGroup_1 = require("../autoScaling/AutoScalingGroup");
const Ec2InstanceCollection_1 = require("../ec2/Ec2InstanceCollection");
const AutoScalingGroupCollection_1 = require("../autoScaling/AutoScalingGroupCollection");
const EcsServiceCollection_1 = require("../ecs/EcsServiceCollection");
const EcsService_1 = require("../ecs/EcsService");
const EcsClusterCollection_1 = require("../ecs/EcsClusterCollection");
const EcsTaskCollection_1 = require("../ecs/EcsTaskCollection");
const S3BucketCollection_1 = require("../s3/S3BucketCollection");
const S3ObjectCollection_1 = require("../s3/S3ObjectCollection");
const IamRole_1 = require("../iam/IamRole");
const Route53HealthCheck_1 = require("../route53/Route53HealthCheck");
const Route53HealthCheckCollection_1 = require("../route53/Route53HealthCheckCollection");
const Route53_1 = require("../route53/Route53");
const DynamoDbTable_1 = require("../dynamoDb/DynamoDbTable");
const DynamoDbTableCollection_1 = require("../dynamoDb/DynamoDbTableCollection");
const DynamoDb_1 = require("../dynamoDb/DynamoDb");
const Route53HostedZone_1 = require("../route53/Route53HostedZone");
const Route53HostedZoneCollection_1 = require("../route53/Route53HostedZoneCollection");
const CloudFormation_1 = require("../cf/CloudFormation");
const CloudFormationStackCollection_1 = require("../cf/CloudFormationStackCollection");
const SystemsManager_1 = require("../ssm/SystemsManager");
const SystemsManagerParameter_1 = require("../ssm/SystemsManagerParameter");
const Kms_1 = require("../kms/Kms");
const KmsKey_1 = require("../kms/KmsKey");
const KmsAliasCollection_1 = require("../kms/KmsAliasCollection");
const KmsAlias_1 = require("../kms/KmsAlias");
const Cognito_1 = require("../cognito/Cognito");
const CognitoUserPoolCollection_1 = require("../cognito/CognitoUserPoolCollection");
const CognitoUserPool_1 = require("../cognito/CognitoUserPool");
const SnsTopicCollection_1 = require("../sns/SnsTopicCollection");
const SnsTopic_1 = require("../sns/SnsTopic");
const Sns_1 = require("../sns/Sns");
const CognitoUser_1 = require("../cognito/CognitoUser");
const CognitoUserCollection_1 = require("../cognito/CognitoUserCollection");
class ApiNodeFactory {
    // IAM
    static iamRole(parent, name) {
        return new IamRole_1.IamRole(parent, name);
    }
    // AutoScaling
    static autoScaling(parent) {
        return new AutoScaling_1.AutoScaling(parent);
    }
    static autoScalingGroup(parent, name) {
        return new AutoScalingGroup_1.AutoScalingGroup(parent, name);
    }
    static autoScalingGroupCollection(parent) {
        return new AutoScalingGroupCollection_1.AutoScalingGroupCollection(parent);
    }
    // S3
    static s3(parent) {
        return new S3_1.S3(parent);
    }
    static s3Bucket(parent, name) {
        return new S3Bucket_1.S3Bucket(parent, name);
    }
    static s3BucketCollection(parent) {
        return new S3BucketCollection_1.S3BucketCollection(parent);
    }
    static s3Object(parent, bucketName, key) {
        return new S3Object_1.S3Object(parent, bucketName, key);
    }
    static s3ObjectCollection(parent, bucketName, prefix) {
        return new S3ObjectCollection_1.S3ObjectCollection(parent, bucketName, prefix);
    }
    // ECS
    static ecs(parent) {
        return new Ecs_1.Ecs(parent);
    }
    static ecsCluster(parent, idOrArn) {
        return new EcsCluster_1.EcsCluster(parent, idOrArn);
    }
    static ecsClusterCollection(parent) {
        return new EcsClusterCollection_1.EcsClusterCollection(parent);
    }
    static ecsTask(parent, clusterId, idOrArn) {
        return new EcsTask_1.EcsTask(parent, clusterId, idOrArn);
    }
    static ecsTaskCollection(parent, clusterId) {
        return new EcsTaskCollection_1.EcsTaskCollection(parent, clusterId);
    }
    static ecsService(parent, clusterId, name) {
        return new EcsService_1.EcsService(parent, clusterId, name);
    }
    static ecsServiceCollection(parent, clusterId) {
        return new EcsServiceCollection_1.EcsServiceCollection(parent, clusterId);
    }
    // EC2
    static ec2(parent) {
        return new Ec2_1.Ec2(parent);
    }
    static ec2Instance(parent, instanceId) {
        return new Ec2Instance_1.Ec2Instance(parent, instanceId);
    }
    static ec2InstanceCollection(parent) {
        return new Ec2InstanceCollection_1.Ec2InstanceCollection(parent);
    }
    // Route53
    static route53(parent) {
        return new Route53_1.Route53(parent);
    }
    static route53HealthCheck(parent, id) {
        return new Route53HealthCheck_1.Route53HealthCheck(parent, id);
    }
    static route53HealthCheckCollection(parent) {
        return new Route53HealthCheckCollection_1.Route53HealthCheckCollection(parent);
    }
    static route53HostedZone(parent, id) {
        return new Route53HostedZone_1.Route53HostedZone(parent, id);
    }
    static route53HostedZoneCollection(parent) {
        return new Route53HostedZoneCollection_1.Route53HostedZoneCollection(parent);
    }
    static route53RecordSetCollection(parent, hostedZoneId) {
        return new Route53RecordSetCollection_1.Route53RecordSetCollection(parent, hostedZoneId);
    }
    // Dynamo DB
    static dynamoDb(parent) {
        return new DynamoDb_1.DynamoDb(parent);
    }
    static dynamoDbTableCollection(parent) {
        return new DynamoDbTableCollection_1.DynamoDbTableCollection(parent);
    }
    static dynamoDbTable(parent, name) {
        return new DynamoDbTable_1.DynamoDbTable(parent, name);
    }
    // CloudFormation
    static cloudFormation(parent) {
        return new CloudFormation_1.CloudFormation(parent);
    }
    static cloudFormationStackCollection(parent) {
        return new CloudFormationStackCollection_1.CloudFormationStackCollection(parent);
    }
    static cloudFormationStack(parent, stackName) {
        return new CloudFormationStack_1.CloudFormationStack(parent, stackName);
    }
    // Systems manager
    static systemsManager(parent) {
        return new SystemsManager_1.SystemsManager(parent);
    }
    static systemsManagerParameterCollection(parent) {
        return new SystemsManagerParameterCollection_1.SystemsManagerParameterCollection(parent);
    }
    static systemsManagerParameter(parent, name) {
        return new SystemsManagerParameter_1.SystemsManagerParameter(parent, name);
    }
    // KMS
    static kms(parent) {
        return new Kms_1.Kms(parent);
    }
    static kmsKeyCollection(parent) {
        return new KmsKeyCollection_1.KmsKeyCollection(parent);
    }
    static kmsKey(parent, id) {
        return new KmsKey_1.KmsKey(parent, id);
    }
    static kmsAliasCollection(parent) {
        return new KmsAliasCollection_1.KmsAliasCollection(parent);
    }
    static kmsAlias(parent, id) {
        return new KmsAlias_1.KmsAlias(parent, id);
    }
    // Cognito
    static cognito(parent) {
        return new Cognito_1.Cognito(parent);
    }
    static cognitoUserPoolCollection(parent) {
        return new CognitoUserPoolCollection_1.CognitoUserPoolCollection(parent);
    }
    static cognitoUserPool(parent, id) {
        return new CognitoUserPool_1.CognitoUserPool(parent, id);
    }
    static cognitoUserCollection(parent, poolId) {
        return new CognitoUserCollection_1.CognitoUserCollection(parent, poolId);
    }
    static cognitoUser(parent, userName, poolId) {
        return new CognitoUser_1.CognitoUser(parent, userName, poolId);
    }
    // SNS
    static sns(parent) {
        return new Sns_1.Sns(parent);
    }
    static snsTopicCollection(parent) {
        return new SnsTopicCollection_1.SnsTopicCollection(parent);
    }
    static snsTopic(parent, arn) {
        return new SnsTopic_1.SnsTopic(parent, arn);
    }
}
exports.ApiNodeFactory = ApiNodeFactory;
