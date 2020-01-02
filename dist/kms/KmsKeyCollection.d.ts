import { ApiNodeCollection } from '../node/ApiNodeCollection';
import { KmsKey } from './KmsKey';
export declare class KmsKeyCollection extends ApiNodeCollection<KmsKey, AWS.KMS.KeyMetadata> {
    load(): Promise<AWS.KMS.KeyMetadata[]>;
    apiNodeFromAwsData(data: AWS.KMS.KeyMetadata): KmsKey;
    apiNodeFromId(id: string): KmsKey;
}
