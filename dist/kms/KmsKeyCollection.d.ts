import { ApiNodeCollection } from '../node/ApiNodeCollection';
import { KmsKey } from './KmsKey';
import { KeyMetadata } from '@aws-sdk/client-kms';
export declare class KmsKeyCollection extends ApiNodeCollection<KmsKey, KeyMetadata> {
    load(): Promise<KeyMetadata[]>;
    apiNodeFromAwsData(data: KeyMetadata): KmsKey;
    apiNodeFromId(id: string): KmsKey;
}
