import * as AWS from 'aws-sdk';
import { FluentAwsConfig } from '../FluentAwsConfig';
export declare class KmsApi {
    config: FluentAwsConfig;
    kms: () => AWS.KMS;
    constructor(config: FluentAwsConfig);
    listAliases(): Promise<AWS.KMS.AliasListEntry[]>;
    listKeys(): Promise<AWS.KMS.KeyListEntry[]>;
    describeKey(keyId: string): Promise<AWS.KMS.KeyMetadata>;
}
