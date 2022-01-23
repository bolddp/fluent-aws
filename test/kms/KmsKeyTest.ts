import { apiNodeCollectionStubs } from '../utils/stubs';
import { AwsApi } from '../../src/awsapi/AwsApi';
import { KmsKey } from '../../src/kms/KmsKey';

describe('KmsKey', () => {
  it('will load awsData', async () => {
    const stubs = apiNodeCollectionStubs();
    const awsApiStub = jest.fn().mockReturnValue({});
    AwsApi.kms = () =>
      <any>{
        describeKey: awsApiStub,
      };

    const sut = new KmsKey(<any>stubs.parentStub, 'keyId');
    await sut.loadAwsData();

    expect(awsApiStub).toHaveBeenCalledWith('keyId');
  });
});
