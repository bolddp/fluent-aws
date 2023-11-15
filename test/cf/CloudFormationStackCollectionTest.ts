import { ApiNodeFactory } from '../../src/node/ApiNodeFactory';
import { apiNodeCollectionStubs } from '../utils/stubs';
import { AwsApi } from '../../src/awsapi/AwsApi';
import { CloudFormationStackCollection } from '../../src/cf/CloudFormationStackCollection';
import { Stack } from '@aws-sdk/client-cloudformation';

describe('CloudFormationStackCollection', () => {
  it('will create from id', async () => {
    const stubs = apiNodeCollectionStubs();
    ApiNodeFactory.cloudFormationStack = stubs.factoryStub;

    const sut = new CloudFormationStackCollection(<any>stubs.parentStub);

    await sut.apiNodeFromId('stackName');

    expect(stubs.factoryStub).toHaveBeenCalledWith(sut, 'stackName');
  });

  it('will create from AWS data', async () => {
    const stubs = apiNodeCollectionStubs();
    ApiNodeFactory.cloudFormationStack = stubs.factoryStub;
    const awsData: Stack = <any>(<unknown>{
      StackName: 'stackName',
    });

    const sut = new CloudFormationStackCollection(<any>stubs.parentStub);

    await sut.apiNodeFromAwsData(awsData);

    expect(stubs.factoryStub).toHaveBeenCalledWith(sut, 'stackName');
  });

  it('will load', async () => {
    const stubs = apiNodeCollectionStubs();
    AwsApi.cloudFormation = () =>
      <any>{
        describeStacks: stubs.awsApiStub.mockReturnValue([
          { StackName: 'stack01' },
          { StackName: 'stack02' },
        ]),
      };

    const sut = new CloudFormationStackCollection(<any>stubs.parentStub);
    await sut.load();

    expect(stubs.awsApiStub).toHaveBeenCalled();
  });
});
