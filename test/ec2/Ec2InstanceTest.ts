import { ApiNodeFactory } from './../../src/node/ApiNodeFactory';
import * as sinon from 'sinon';
import { expect } from 'chai';
import { apiNodeCollectionStubs } from "../utils/stubs";
import { AwsApi } from "../../src/awsapi/AwsApi";
import { Ec2Instance } from "../../src/ec2/Ec2Instance";
import { IamRole } from '../../src/iam/IamRole';

describe('Ec2Instance', () => {
  it('will load awsData', async () => {
    const stubs = apiNodeCollectionStubs();
    const awsApiStub = sinon.stub().returns({});
    AwsApi.ec2.describeInstance = awsApiStub;

    const sut = new Ec2Instance(<any>stubs.parentStub, 'instanceId');
    await sut.loadAwsData();

    expect(awsApiStub.calledOnce).to.be.true;
    expect(awsApiStub.args[0][0]).to.equal('instanceId');
  });

  it('will provide IAM role', async () => {
    const stubs = apiNodeCollectionStubs();
    const sut = new Ec2Instance(<any>stubs.parentStub, 'instanceId');

    const iamRole = new IamRole(sut, undefined);
    ApiNodeFactory.iamRole = stubs.factoryStub.returns(iamRole);

    AwsApi.ec2.describeInstance = stubs.awsApiStub.returns({
      IamInstanceProfile: { Arn: 'tjoho/iamRoleArn' }
    })

    await sut.iamRole().ensureResolved();
    expect(iamRole.name).to.equal('iamRoleArn');
  });

  it('throw error in missing IAM role', async () => {
    const stubs = apiNodeCollectionStubs();
    const sut = new Ec2Instance(<any>stubs.parentStub, 'instanceId');

    const iamRole = new IamRole(sut, undefined);
    ApiNodeFactory.iamRole = stubs.factoryStub.returns(iamRole);

    AwsApi.ec2.describeInstance = stubs.awsApiStub.returns({});

    let thrownError: Error;
    await sut.iamRole().awsData()
      .catch(error => thrownError = error);
    expect(thrownError).to.not.undefined;
    expect(thrownError.message).to.equal('EC2 instance has no IAM role');
  });

});