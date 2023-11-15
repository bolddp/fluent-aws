import { ApiNode } from './../node/ApiNode';
import { AwsDataApiNode } from '../node/AwsDataApiNode';
import { ResourceRecordSet } from '@aws-sdk/client-route-53';
export declare class Route53RecordSetCollection extends AwsDataApiNode<ResourceRecordSet[]> {
    hostedZoneId: string;
    constructor(parent: ApiNode, hostedZoneId: string);
    loadAwsData(): Promise<ResourceRecordSet[]>;
    create(recordSet: ResourceRecordSet): Promise<void>;
    /**
     * Deletes a record set from the the collection.
     */
    delete(recordSet: ResourceRecordSet): Promise<void>;
}
