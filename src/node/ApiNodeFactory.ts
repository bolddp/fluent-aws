import { Route53RecordSetCollection } from './../route53/Route53RecordSetCollection';
import { ApiNode } from "./ApiNode";
import { S3 } from "../s3/S3";
import { Ecs } from "../ecs/Ecs";
import { Ec2 } from "../ec2/Ec2";
import { S3Bucket } from '../s3/S3Bucket';
import { EcsCluster } from "../ecs/EcsCluster";
import { EcsTask } from "../ecs/EcsTask";
import { Ec2Instance } from '../ec2/Ec2Instance';
import { S3Object } from '../s3/S3Object';
import { AutoScaling } from "../autoScaling/AutoScaling";
import { AutoScalingGroup } from "../autoScaling/AutoScalingGroup";
import { Ec2InstanceCollection } from "../ec2/Ec2InstanceCollection";
import { AutoScalingGroupCollection } from "../autoScaling/AutoScalingGroupCollection";
import { EcsServiceCollection } from "../ecs/EcsServiceCollection";
import { EcsService } from "../ecs/EcsService";
import { EcsClusterCollection } from "../ecs/EcsClusterCollection";
import { EcsTaskCollection } from "../ecs/EcsTaskCollection";
import { S3BucketCollection } from "../s3/S3BucketCollection";
import { S3ObjectCollection } from '../s3/S3ObjectCollection';
import { IamRole } from "../iam/IamRole";
import { Route53HealthCheck } from "../route53/Route53HealthCheck";
import { Route53HealthCheckCollection } from '../route53/Route53HealthCheckCollection';
import { Route53 } from "../route53/Route53";
import { DynamoDbTable } from "../dynamoDb/DynamoDbTable";
import { DynamoDbTableCollection } from "../dynamoDb/DynamoDbTableCollection";
import { DynamoDb } from "../dynamoDb/DynamoDb";
import { Route53HostedZone } from "../route53/Route53HostedZone";
import { Route53HostedZoneCollection } from "../route53/Route53HostedZoneCollection";

export class ApiNodeFactory {
  // IAM
  static iamRole(parent: ApiNode, name: string) { return new IamRole(parent, name); }
  // AutoScaling
  static autoScaling(parent: ApiNode) { return new AutoScaling(parent); }
  static autoScalingGroup(parent: ApiNode, name: string) { return new AutoScalingGroup(parent, name); }
  static autoScalingGroupCollection(parent: ApiNode) { return new AutoScalingGroupCollection(parent); }
  // S3
  static s3(parent: ApiNode) { return new S3(parent); }
  static s3Bucket(parent: ApiNode, name: string) { return new S3Bucket(parent, name); }
  static s3BucketCollection(parent: ApiNode) { return new S3BucketCollection(parent); }
  static s3Object(parent: ApiNode, bucketName: string, key: string) { return new S3Object(parent, bucketName, key); }
  static s3ObjectCollection(parent: ApiNode, bucketName: string) { return new S3ObjectCollection(parent, bucketName); }
  // ECS
  static ecs(parent: ApiNode) { return new Ecs(parent); }
  static ecsCluster(parent: ApiNode, idOrArn: string) { return new EcsCluster(parent, idOrArn); }
  static ecsClusterCollection(parent: ApiNode) { return new EcsClusterCollection(parent); }
  static ecsTask(parent: ApiNode, clusterId: string, idOrArn: string) { return new EcsTask(parent, clusterId, idOrArn); }
  static ecsTaskCollection(parent: ApiNode, clusterId: string) { return new EcsTaskCollection(parent, clusterId); }
  static ecsService(parent: ApiNode, clusterId: string, name: string) {
    return new EcsService(parent, clusterId, name);
  }
  static ecsServiceCollection(parent: ApiNode, clusterId: string) { return new EcsServiceCollection(parent, clusterId); }
  // EC2
  static ec2(parent: ApiNode) { return new Ec2(parent); }
  static ec2Instance(parent: ApiNode, instanceId: string) { return new Ec2Instance(parent, instanceId); }
  static ec2InstanceCollection(parent: ApiNode) { return new Ec2InstanceCollection(parent); }
  // Route53
  static route53(parent: ApiNode) { return new Route53(parent); }
  static route53HealthCheck(parent: ApiNode, id: string) { return new Route53HealthCheck(parent, id); }
  static route53HealthCheckCollection(parent: ApiNode) { return new Route53HealthCheckCollection(parent); }
  static route53HostedZone(parent: ApiNode, id: string) { return new Route53HostedZone(parent, id); }
  static route53HostedZoneCollection(parent: ApiNode) { return new Route53HostedZoneCollection(parent); }
  static route53RecordSetCollection(parent: ApiNode, hostedZoneId: string) { return new Route53RecordSetCollection(parent, hostedZoneId); }
  // Dynamo DB
  static dynamoDb(parent: ApiNode) { return new DynamoDb(parent); }
  static dynamoDbTableCollection(parent: ApiNode) { return new DynamoDbTableCollection(parent); }
  static dynamoDbTable(parent: ApiNode, name: string) { return new DynamoDbTable(parent, name); }
}