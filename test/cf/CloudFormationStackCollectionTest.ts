import { expect } from 'chai';
import { ApiNodeFactory } from '../../src/node/ApiNodeFactory';
import { apiNodeCollectionStubs } from "../utils/stubs";
import { AwsApi } from '../../src/awsapi/AwsApi';
import { CloudFormationStackCollection } from '../../src/cf/CloudFormationStackCollection';

describe('CloudFormationStackCollection', () => {
  it('will create from id', async () => {
    const stubs = apiNodeCollectionStubs();
    ApiNodeFactory.cloudFormationStack = stubs.factoryStub;

    const sut = new CloudFormationStackCollection(<any>stubs.parentStub);

    await sut.apiNodeFromId('stackName');

    expect(stubs.factoryStub.calledOnce).to.be.true;
    expect(stubs.factoryStub.args[0][0]).to.equal(sut);
    expect(stubs.factoryStub.args[0][1]).to.equal('stackName');
  });

  it('will create from AWS data', async () => {
    const stubs = apiNodeCollectionStubs();
    ApiNodeFactory.cloudFormationStack = stubs.factoryStub;
    const awsData: AWS.CloudFormation.Stack = <any><unknown>{
      StackName: 'stackName'
    }

    const sut = new CloudFormationStackCollection(<any>stubs.parentStub);

    await sut.apiNodeFromAwsData(awsData);

    expect(stubs.factoryStub.calledOnce).to.be.true;
    expect(stubs.factoryStub.args[0][0]).to.equal(sut);
    expect(stubs.factoryStub.args[0][1]).to.equal('stackName');
  })

  it('will load', async () => {
    const stubs = apiNodeCollectionStubs();
    AwsApi.cloudFormation = () => (<any>{
      describeStacks: stubs.awsApiStub.returns([{ StackName: 'stack01' }, { StackName: 'stack02' }])
    });

    const sut = new CloudFormationStackCollection(<any>stubs.parentStub);
    await sut.load();

    expect(stubs.awsApiStub.calledOnce).to.be.true;
  });
});