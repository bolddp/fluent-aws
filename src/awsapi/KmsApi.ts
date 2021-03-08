import * as AWS from 'aws-sdk';
import { FluentAwsConfig } from '../FluentAwsConfig';

const debug = require('debug')('fluentaws:KmsApi');

export class KmsApi {
  config: FluentAwsConfig;
  kms = () => new AWS.KMS(this.config);

  constructor(config: FluentAwsConfig) {
    this.config = config;
  }

  async listAliases(): Promise<AWS.KMS.AliasListEntry[]> {
    debug(`listing aliases`);
    let result: AWS.KMS.AliasListEntry[] = [];
    const recursiveFunction = async (marker?: string) => {
      const response = await this.kms().listAliases({
        Marker: marker
      }).promise();
      result = result.concat(response.Aliases);
      if (response.Truncated) {
        await recursiveFunction(response.NextMarker);
      }
    }
    await recursiveFunction();
    debug('listed aliases');
    return result;
  }

  async listKeys(): Promise<AWS.KMS.KeyListEntry[]> {
    debug(`listing keys`);
    let result: AWS.KMS.KeyListEntry[] = [];
    const recursiveFunction = async (marker?: string) => {
      const response = await this.kms().listKeys({
        Marker: marker
      }).promise();
      result = result.concat(response.Keys);
      if (response.Truncated) {
        await recursiveFunction(response.NextMarker);
      }
    }
    await recursiveFunction();
    debug('listed keys');
    return result;
  }

  async describeKey(keyId: string): Promise<AWS.KMS.KeyMetadata> {
    debug(`describing key: %s`, keyId);
    const response = await this.kms().describeKey({
      KeyId: keyId
    }).promise();
    debug('described key');
    return response.KeyMetadata;
  }
}
