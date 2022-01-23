import { IamRole } from './../../src/iam/IamRole';
import { AwsApi } from './../../src/awsapi/AwsApi';
import { apiNodeCollectionStubs } from './../utils/stubs';

describe('IamRole', () => {
  it('will load awsData', async () => {
    const stubs = apiNodeCollectionStubs();
    const awsApiStub = jest.fn().mockReturnValue({});
    AwsApi.iam = () =>
      <any>{
        getRole: awsApiStub,
      };

    const sut = new IamRole(<any>stubs.parentStub, 'roleName');
    await sut.loadAwsData();

    expect(awsApiStub).toHaveBeenCalledWith('roleName');
  });
});
