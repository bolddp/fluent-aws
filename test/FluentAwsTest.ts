import { AwsApi } from './../src/awsapi/AwsApi';
import * as AWS from 'aws-sdk';
import { expect } from 'chai';
import * as sinon from 'sinon';
import { ApiNodeFactory } from '../src/node/ApiNodeFactory';
import { FluentAws, aws } from '../src/FluentAws';

describe('FluentAws', () => {
  let s3Stub: sinon.SinonStub<any[], any>;
  let ecsStub: sinon.SinonStub<any[], any>;
  let ec2Stub: sinon.SinonStub<any[], any>;
  let autoScalingStub: sinon.SinonStub<any[], any>;
  let route53Stub: sinon.SinonStub<any[], any>;
  let dynamoDbStub: sinon.SinonStub<any[], any>
  let cloudFormationStub: sinon.SinonStub<any[], any>
  let systemsManagerStub: sinon.SinonStub<any[], any>
  let kmsStub: sinon.SinonStub<any[], any>

  let sut: FluentAws;

  before(() => {
    s3Stub = sinon.stub();
    s3Stub = s3Stub.returns(s3Stub);
    ecsStub = sinon.stub();
    ecsStub = ecsStub.returns(ecsStub);
    ec2Stub = sinon.stub();
    ec2Stub = ec2Stub.returns(ec2Stub);
    autoScalingStub = sinon.stub();
    autoScalingStub = autoScalingStub.returns(autoScalingStub);
    route53Stub = sinon.stub();
    route53Stub = route53Stub.returns(route53Stub);
    dynamoDbStub = sinon.stub();
    dynamoDbStub = dynamoDbStub.returns(dynamoDbStub);
    cloudFormationStub = sinon.stub();
    cloudFormationStub = cloudFormationStub.returns(cloudFormationStub);
    systemsManagerStub = sinon.stub();
    systemsManagerStub = systemsManagerStub.returns(systemsManagerStub);
    kmsStub = sinon.stub();
    kmsStub = kmsStub.returns(kmsStub);

    ApiNodeFactory.s3 = s3Stub;
    ApiNodeFactory.ecs = ecsStub;
    ApiNodeFactory.ec2 = ec2Stub;
    ApiNodeFactory.autoScaling = autoScalingStub;
    ApiNodeFactory.route53 = route53Stub;
    ApiNodeFactory.dynamoDb = dynamoDbStub;
    ApiNodeFactory.cloudFormation = cloudFormationStub;
    ApiNodeFactory.systemsManager = systemsManagerStub;
    ApiNodeFactory.kms = kmsStub;

    sut = aws();
  });

  it('should initialize', () => {
    expect(s3Stub.calledOnce).to.be.true;
    expect(ecsStub.calledOnce).to.be.true;
    expect(ec2Stub.calledOnce).to.be.true;
    expect(autoScalingStub.calledOnce).to.be.true;
    expect(route53Stub.calledOnce).to.be.true;
    expect(dynamoDbStub.calledOnce).to.be.true;
    expect(cloudFormationStub.calledOnce).to.be.true;
    expect(systemsManagerStub.calledOnce).to.be.true;
    expect(kmsStub.calledOnce).to.be.true;

    expect(sut.s3()).to.equal(s3Stub);
    expect(sut.ecs()).to.equal(ecsStub);
    expect(sut.ec2()).to.equal(ec2Stub);
    expect(sut.autoScaling()).to.equal(autoScalingStub);
    expect(sut.route53()).to.equal(route53Stub);
    expect(sut.dynamoDb()).to.equal(dynamoDbStub);
    expect(sut.cloudFormation()).to.equal(cloudFormationStub);
    expect(sut.systemsManager()).to.equal(systemsManagerStub);
    expect(sut.kms()).to.equal(kmsStub);
  });

  it('should configure', async () => {
    const stub = sinon.stub();
    AwsApi.configure = stub;

    await sut.configure({ region: 'eu-west-1' }).ensureResolved();

    expect(stub.calledOnce).to.be.true;
    expect(stub.args[0][0].region).to.equal('eu-west-1');
  });

  it('should set profile', async () => {
    const stub = sinon.stub();
    AwsApi.profile = stub;

    await sut.profile('profile').ensureResolved();

    expect(stub.calledOnce).to.be.true;
    expect(stub.args[0][0]).to.equal('profile');
  });

  it('should assume role', async () => {
    const stub = sinon.stub();
    AwsApi.assumeRole = stub;

    await sut.assumeRole('roleArn', 'sessionName').ensureResolved();

    expect(stub.calledOnce).to.be.true;
    expect(stub.args[0][0]).to.equal('roleArn');
    expect(stub.args[0][1]).to.equal('sessionName');
  });
});