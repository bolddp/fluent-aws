import { ApiNodeFactory } from '../../src/node/ApiNodeFactory';
import { apiNodeCollectionStubs } from '../utils/stubs';
import { AwsApi } from '../../src/awsapi/AwsApi';
import { KmsKeyCollection } from '../../src/kms/KmsKeyCollection';

describe('KmsKeyCollection', () => {
  it('will create from id', async () => {
    const stubs = apiNodeCollectionStubs();
    ApiNodeFactory.kmsKey = stubs.factoryStub;

    const sut = new KmsKeyCollection(<any>stubs.parentStub);

    sut.apiNodeFromId('keyId');

    expect(stubs.factoryStub).toHaveBeenCalledWith(sut, 'keyId');
  });

  it('will create from AWS data', async () => {
    const stubs = apiNodeCollectionStubs();
    ApiNodeFactory.kmsKey = stubs.factoryStub;
    const awsData: AWS.KMS.KeyMetadata = <any>(<unknown>{
      KeyId: 'keyId',
    });

    const sut = new KmsKeyCollection(<any>stubs.parentStub);

    sut.apiNodeFromAwsData(awsData);

    expect(stubs.factoryStub).toHaveBeenCalledWith(sut, 'keyId');
  });

  it('will load', async () => {
    const stubs = apiNodeCollectionStubs();
    const stubs2 = apiNodeCollectionStubs();
    AwsApi.kms = () =>
      <any>{
        listKeys: stubs.awsApiStub.mockReturnValue([
          { KeyId: 'key01' },
          { KeyId: 'key02' },
        ]),
        describeKey: stubs2.awsApiStub.mockReturnValue({ KeyId: 'keyId' }),
      };

    const sut = new KmsKeyCollection(<any>stubs.parentStub);
    await sut.load();

    expect(stubs.awsApiStub).toHaveBeenCalled();
    expect(stubs2.awsApiStub).toHaveBeenCalledTimes(2);
  });
});
