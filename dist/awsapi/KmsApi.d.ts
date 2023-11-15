import { AliasListEntry, KeyListEntry, KeyMetadata } from '@aws-sdk/client-kms';
import { FluentAwsConfig } from '../FluentAwsConfig';
export declare class KmsApi {
    private config;
    private kms;
    constructor(config: FluentAwsConfig);
    listAliases(): Promise<AliasListEntry[]>;
    listKeys(): Promise<KeyListEntry[]>;
    describeKey(keyId: string): Promise<KeyMetadata>;
}
