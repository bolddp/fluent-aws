import * as AWS from 'aws-sdk';
export declare class KmsApi {
    kms: () => AWS.KMS;
    listAliases(): Promise<AWS.KMS.AliasListEntry[]>;
    listKeys(): Promise<AWS.KMS.KeyListEntry[]>;
    describeKey(keyId: string): Promise<AWS.KMS.KeyMetadata>;
}
