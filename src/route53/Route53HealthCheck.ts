import { AwsDataApiNode } from "../node/AwsDataApiNode";
import { ApiNode } from "../node/ApiNode";
import { AwsApi } from "../awsapi/AwsApi";

export class Route53HealthCheck extends AwsDataApiNode<AWS.Route53.HealthCheck> {
  id: string;

  constructor(parent: ApiNode, id: string, awsData?: AWS.Route53.HealthCheck) {
    super(parent, awsData);
    this.id = id;
  }

  loadAwsData() {
    return AwsApi.route53.getHealthCheck(this.id);
  }

  async delete(): Promise<void> {
    await this.ensureResolved();
    await AwsApi.route53.deleteHealthCheck(this.id);
  }
}