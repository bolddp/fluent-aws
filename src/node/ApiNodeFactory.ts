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

export class ApiNodeFactory {
  // IAM
  static iamRole(parent: ApiNode, name: string, awsData?: AWS.IAM.Role) { return new IamRole(parent, name, awsData); }
  // AutoScaling
  static autoScaling(parent: ApiNode) { return new AutoScaling(parent); }
  static autoScalingGroup(parent: ApiNode, name: string, awsData?: AWS.AutoScaling.AutoScalingGroup) { return new AutoScalingGroup(parent, name, awsData); }
  static autoScalingGroupCollection(parent: ApiNode) { return new AutoScalingGroupCollection(parent); }
  // S3
  static s3(parent: ApiNode) { return new S3(parent); }
  static s3Bucket(parent: ApiNode, name: string) { return new S3Bucket(parent, name); }
  static s3BucketCollection(parent: ApiNode) { return new S3BucketCollection(parent); }
  static s3Object(parent: ApiNode, bucket: S3Bucket, key: string) { return new S3Object(parent, bucket, key); }
  static s3ObjectCollection(parent: ApiNode, bucket: S3Bucket) { return new S3ObjectCollection(parent, bucket); }
  // ECS
  static ecs(parent: ApiNode) { return new Ecs(parent); }
  static ecsCluster(parent: ApiNode, idOrArn: string, awsData?: AWS.ECS.Cluster) { return new EcsCluster(parent, idOrArn, awsData); }
  static ecsClusterCollection(parent: ApiNode) { return new EcsClusterCollection(parent); }
  static ecsTask(parent: ApiNode, cluster: EcsCluster, idOrArn: string, awsData?: AWS.ECS.Task) { return new EcsTask(parent, cluster, idOrArn, awsData); }
  static ecsTaskCollection(parent: ApiNode, cluster: EcsCluster) { return new EcsTaskCollection(parent, cluster); }
  static ecsService(parent: ApiNode, cluster: EcsCluster, name: string, awsData?: AWS.ECS.Cluster) {
    return new EcsService(parent, cluster, name, awsData);
  }
  static ecsServiceCollection(parent: ApiNode, cluster: EcsCluster) { return new EcsServiceCollection(parent, cluster); }
  // EC2
  static ec2(parent: ApiNode) { return new Ec2(parent); }
  static ec2Instance(parent: ApiNode, instanceId: string, awsData?: AWS.EC2.Instance) { return new Ec2Instance(parent, instanceId, awsData); }
  static ec2InstanceCollection(parent: ApiNode) { return new Ec2InstanceCollection(parent); }
  // Route53
  static route53(parent: ApiNode) { return new Route53(parent); }
  static route53HealthCheck(parent: ApiNode, id: string, awsData?: AWS.Route53.HealthCheck) { return new Route53HealthCheck(parent, id, awsData); }
  static route53HealthCheckCollection(parent: ApiNode) { return new Route53HealthCheckCollection(parent); }
}