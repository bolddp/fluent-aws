import { AwsDataApiNode } from '../node/AwsDataApiNode';
import { ApiNode } from '../node/ApiNode';
import { AwsApi } from '../awsapi/AwsApi';
import { HealthCheck } from '@aws-sdk/client-route-53';

export class Route53HealthCheck extends AwsDataApiNode<HealthCheck> {
  id: string;

  constructor(parent: ApiNode, id: string) {
    super(parent);
    this.id = id;
  }

  loadAwsData() {
    return AwsApi.route53(this.config()).getHealthCheck(this.id);
  }

  async delete(): Promise<void> {
    await this.ensureResolved();
    await AwsApi.route53(this.config()).deleteHealthCheck(this.id);
  }
}
