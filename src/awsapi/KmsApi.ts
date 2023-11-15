import {
  AliasListEntry,
  KMS,
  KeyListEntry,
  KeyMetadata,
} from '@aws-sdk/client-kms';
import { FluentAwsConfig } from '../FluentAwsConfig';

const debug = require('debug')('fluentaws:KmsApi');

export class KmsApi {
  private kms = () => new KMS(this.config);

  constructor(private config: FluentAwsConfig) {}

  async listAliases(): Promise<AliasListEntry[]> {
    debug(`listing aliases`);
    let result: AliasListEntry[] = [];
    const recursiveFunction = async (marker?: string) => {
      const response = await this.kms().listAliases({
        Marker: marker,
      });
      result = result.concat(response.Aliases);
      if (response.Truncated) {
        await recursiveFunction(response.NextMarker);
      }
    };
    await recursiveFunction();
    debug('listed aliases');
    return result;
  }

  async listKeys(): Promise<KeyListEntry[]> {
    debug(`listing keys`);
    let result: KeyListEntry[] = [];
    const recursiveFunction = async (marker?: string) => {
      const response = await this.kms().listKeys({
        Marker: marker,
      });
      result = result.concat(response.Keys);
      if (response.Truncated) {
        await recursiveFunction(response.NextMarker);
      }
    };
    await recursiveFunction();
    debug('listed keys');
    return result;
  }

  async describeKey(keyId: string): Promise<KeyMetadata> {
    debug(`describing key: %s`, keyId);
    const response = await this.kms().describeKey({
      KeyId: keyId,
    });
    debug('described key');
    return response.KeyMetadata;
  }
}
