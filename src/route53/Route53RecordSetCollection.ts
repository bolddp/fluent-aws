import { ApiNode } from './../node/ApiNode';
import { AwsApi } from '../awsapi/AwsApi';
import { AwsDataApiNode } from '../node/AwsDataApiNode';

export class Route53RecordSetCollection extends AwsDataApiNode<AWS.Route53.ResourceRecordSet[]> {
  hostedZoneId: string;

  constructor(parent: ApiNode, hostedZoneId: string) {
    super(parent);
    this.hostedZoneId = hostedZoneId;
  }

  loadAwsData(): Promise<AWS.Route53.ResourceRecordSet[]> {
    return AwsApi.route53(this.config()).listRecordSets(this.hostedZoneId);
  }

  async create(recordSet: AWS.Route53.ResourceRecordSet): Promise<void> {
    await this.ensureResolved();
    await AwsApi.route53(this.config()).createRecordSet(this.hostedZoneId, recordSet);
  }

  /**
   * Deletes a record set from the the collection.
   */
  async delete(recordSet: AWS.Route53.ResourceRecordSet): Promise<void> {
    await this.ensureResolved();
    await AwsApi.route53(this.config()).deleteRecordSet(this.hostedZoneId, recordSet);
  }
}