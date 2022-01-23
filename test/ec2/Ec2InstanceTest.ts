import { ApiNodeFactory } from './../../src/node/ApiNodeFactory';

import { apiNodeCollectionStubs } from '../utils/stubs';
import { AwsApi } from '../../src/awsapi/AwsApi';
import { Ec2Instance } from '../../src/ec2/Ec2Instance';
import { IamRole } from '../../src/iam/IamRole';

describe('Ec2Instance', () => {
  it('will load awsData', async () => {
    const stubs = apiNodeCollectionStubs();
    const awsApiStub = jest.fn().mockReturnValue({});
    AwsApi.ec2 = () =>
      <any>{
        describeInstance: awsApiStub,
      };

    const sut = new Ec2Instance(<any>stubs.parentStub, 'instanceId');
    await sut.loadAwsData();

    expect(awsApiStub).toHaveBeenCalledWith('instanceId');
  });

  it('will provide IAM role', async () => {
    const stubs = apiNodeCollectionStubs();
    const sut = new Ec2Instance(<any>stubs.parentStub, 'instanceId');

    const iamRole = new IamRole(sut, undefined);
    ApiNodeFactory.iamRole = stubs.factoryStub.mockReturnValue(iamRole);

    AwsApi.ec2 = () =>
      <any>{
        describeInstance: stubs.awsApiStub.mockReturnValue({
          IamInstanceProfile: { Arn: 'tjoho/iamRoleName' },
        }),
      };

    const stubs2 = apiNodeCollectionStubs();
    AwsApi.iam = () =>
      <any>{
        getInstanceProfile: stubs2.awsApiStub.mockReturnValue({
          Roles: [{ RoleName: 'iamRoleName' }],
        }),
      };

    await sut.iamRole().ensureResolved();
    expect(iamRole.name).toEqual('iamRoleName');
  });

  it('will throw error in missing IAM role', async () => {
    const stubs = apiNodeCollectionStubs();
    const sut = new Ec2Instance(<any>stubs.parentStub, 'instanceId');

    const iamRole = new IamRole(sut, undefined);
    ApiNodeFactory.iamRole = stubs.factoryStub.mockReturnValue(iamRole);

    AwsApi.ec2 = () =>
      <any>{
        describeInstance: stubs.awsApiStub.mockReturnValue({}),
      };

    let thrownError: Error;
    await sut
      .iamRole()
      .awsData()
      .catch((error) => (thrownError = error));
    expect(thrownError).toBeDefined();
    expect(thrownError.message).toEqual('EC2 instance has no IAM role');
  });

  it('will throw error in missing IAM role', async () => {
    const stubs = apiNodeCollectionStubs();
    const sut = new Ec2Instance(<any>stubs.parentStub, 'instanceId');

    const iamRole = new IamRole(sut, undefined);
    ApiNodeFactory.iamRole = stubs.factoryStub.mockReturnValue(iamRole);

    AwsApi.ec2 = () =>
      <any>{
        describeInstance: stubs.awsApiStub.mockReturnValue({
          IamInstanceProfile: { Arn: 'tjoho/iamRoleName' },
        }),
      };

    const stubs2 = apiNodeCollectionStubs();
    AwsApi.iam = () =>
      <any>{
        getInstanceProfile: stubs2.awsApiStub.mockReturnValue({
          Roles: [],
        }),
      };

    let thrownError: Error;
    await sut
      .iamRole()
      .awsData()
      .catch((error) => (thrownError = error));
    expect(thrownError).toBeDefined();
    expect(thrownError.message).toEqual(
      'No role in EC2 instance profile (profile ARN: tjoho/iamRoleName)'
    );
  });
});
