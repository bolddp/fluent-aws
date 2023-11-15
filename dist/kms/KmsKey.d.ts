import { ApiNode } from '../node/ApiNode';
import { AwsDataApiNode } from '../node/AwsDataApiNode';
import { KeyMetadata } from '@aws-sdk/client-kms';
export declare class KmsKey extends AwsDataApiNode<KeyMetadata> {
    id: string;
    constructor(parent: ApiNode, id: string);
    loadAwsData(): Promise<KeyMetadata>;
}
