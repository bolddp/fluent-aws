import { ApiNode } from './../node/ApiNode';
import { AwsDataApiNode } from '../node/AwsDataApiNode';
export declare class Route53RecordSetCollection extends AwsDataApiNode<AWS.Route53.ResourceRecordSet[]> {
    hostedZoneId: string;
    constructor(parent: ApiNode, hostedZoneId: string);
    loadAwsData(): Promise<AWS.Route53.ResourceRecordSet[]>;
    create(recordSet: AWS.Route53.ResourceRecordSet): Promise<void>;
    /**
     * Deletes a record set from the the collection.
     */
    delete(recordSet: AWS.Route53.ResourceRecordSet): Promise<void>;
}
