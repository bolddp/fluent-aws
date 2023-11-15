import { ApiNodeFactory } from '../../src/node/ApiNodeFactory';
import { apiNodeCollectionStubs } from '../utils/stubs';
import { AwsApi } from '../../src/awsapi/AwsApi';
import { KmsAliasCollection } from '../../src/kms/KmsAliasCollection';
import { AliasListEntry } from '@aws-sdk/client-kms';

describe('KmsAliasCollection', () => {
  it('will create from id', async () => {
    const stubs = apiNodeCollectionStubs();
    ApiNodeFactory.kmsAlias = stubs.factoryStub;

    const sut = new KmsAliasCollection(<any>stubs.parentStub);

    sut.apiNodeFromId('aliasName');

    expect(stubs.factoryStub).toHaveBeenCalledWith(sut, 'aliasName');
  });

  it('will create from AWS data', async () => {
    const stubs = apiNodeCollectionStubs();
    ApiNodeFactory.kmsAlias = stubs.factoryStub;
    const awsData: AliasListEntry = <any>(<unknown>{
      AliasName: 'aliasName',
    });

    const sut = new KmsAliasCollection(<any>stubs.parentStub);

    sut.apiNodeFromAwsData(awsData);

    expect(stubs.factoryStub).toHaveBeenCalledWith(sut, 'aliasName');
  });

  it('will load', async () => {
    const stubs = apiNodeCollectionStubs();
    AwsApi.kms = () =>
      <any>{
        listAliases: stubs.awsApiStub.mockReturnValue([
          { AliasName: 'alias01' },
          { AliasName: 'alias02' },
        ]),
      };

    const sut = new KmsAliasCollection(<any>stubs.parentStub);
    await sut.load();

    expect(stubs.awsApiStub).toHaveBeenCalled();
  });
});
