import { ApiNode } from '../node/ApiNode';
import { AwsDataApiNode } from '../node/AwsDataApiNode';
export declare class KmsKey extends AwsDataApiNode<AWS.KMS.KeyMetadata> {
    id: string;
    constructor(parent: ApiNode, id: string);
    loadAwsData(): Promise<import("aws-sdk/clients/kms").KeyMetadata>;
}
