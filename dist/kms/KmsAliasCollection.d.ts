import { ApiNodeCollection } from '../node/ApiNodeCollection';
import { KmsAlias } from './KmsAlias';
import { AliasListEntry } from '@aws-sdk/client-kms';
export declare class KmsAliasCollection extends ApiNodeCollection<KmsAlias, AliasListEntry> {
    load(): Promise<AliasListEntry[]>;
    apiNodeFromAwsData(data: AliasListEntry): KmsAlias;
    apiNodeFromId(id: string): KmsAlias;
}
