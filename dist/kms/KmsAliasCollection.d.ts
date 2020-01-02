import { ApiNodeCollection } from '../node/ApiNodeCollection';
import { KmsAlias } from './KmsAlias';
export declare class KmsAliasCollection extends ApiNodeCollection<KmsAlias, AWS.KMS.AliasListEntry> {
    load(): Promise<AWS.KMS.AliasListEntry[]>;
    apiNodeFromAwsData(data: AWS.KMS.AliasListEntry): KmsAlias;
    apiNodeFromId(id: string): KmsAlias;
}
