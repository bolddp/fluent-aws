import { AwsApi } from './../src/awsapi/AwsApi';
import * as AWS from 'aws-sdk';
import { expect } from 'chai';
import * as sinon from 'sinon';
import { ApiNodeFactory } from '../src/node/ApiNodeFactory';
import { FluentAws, aws } from '../src/FluentAws';

describe('FluentAws', () => {
  let autoScalingStub: sinon.SinonStub<any[], any>;
  let cloudFormationStub: sinon.SinonStub<any[], any>
  let cognitoStub: sinon.SinonStub<any[], any>;
  let dynamoDbStub: sinon.SinonStub<any[], any>
  let ec2Stub: sinon.SinonStub<any[], any>;
  let ecsStub: sinon.SinonStub<any[], any>;
  let kmsStub: sinon.SinonStub<any[], any>
  let route53Stub: sinon.SinonStub<any[], any>;
  let s3Stub: sinon.SinonStub<any[], any>;
  let snsStub: sinon.SinonStub<any[], any>;
  let systemsManagerStub: sinon.SinonStub<any[], any>

  let sut: FluentAws;

  before(() => {
    autoScalingStub = sinon.stub();
    autoScalingStub = autoScalingStub.returns(autoScalingStub);
    cloudFormationStub = sinon.stub();
    cloudFormationStub = cloudFormationStub.returns(cloudFormationStub);
    cognitoStub = sinon.stub();
    cognitoStub = cognitoStub.returns(cognitoStub);
    dynamoDbStub = sinon.stub();
    dynamoDbStub = dynamoDbStub.returns(dynamoDbStub);
    ec2Stub = sinon.stub();
    ec2Stub = ec2Stub.returns(ec2Stub);
    ecsStub = sinon.stub();
    ecsStub = ecsStub.returns(ecsStub);
    kmsStub = sinon.stub();
    kmsStub = kmsStub.returns(kmsStub);
    route53Stub = sinon.stub();
    route53Stub = route53Stub.returns(route53Stub);
    s3Stub = sinon.stub();
    s3Stub = s3Stub.returns(s3Stub);
    snsStub = sinon.stub();
    snsStub = snsStub.returns(snsStub);
    systemsManagerStub = sinon.stub();
    systemsManagerStub = systemsManagerStub.returns(systemsManagerStub);

    ApiNodeFactory.autoScaling = autoScalingStub;
    ApiNodeFactory.cloudFormation = cloudFormationStub;
    ApiNodeFactory.cognito = cognitoStub;
    ApiNodeFactory.dynamoDb = dynamoDbStub;
    ApiNodeFactory.ec2 = ec2Stub;
    ApiNodeFactory.ecs = ecsStub;
    ApiNodeFactory.kms = kmsStub;
    ApiNodeFactory.route53 = route53Stub;
    ApiNodeFactory.s3 = s3Stub;
    ApiNodeFactory.sns = snsStub;
    ApiNodeFactory.systemsManager = systemsManagerStub;

    sut = aws();
  });

  it('should initialize', () => {
    expect(sut.autoScaling()).to.equal(autoScalingStub);
    expect(sut.cloudFormation()).to.equal(cloudFormationStub);
    expect(sut.cognito()).to.equal(cognitoStub);
    expect(sut.dynamoDb()).to.equal(dynamoDbStub);
    expect(sut.ec2()).to.equal(ec2Stub);
    expect(sut.ecs()).to.equal(ecsStub);
    expect(sut.kms()).to.equal(kmsStub);
    expect(sut.route53()).to.equal(route53Stub);
    expect(sut.s3()).to.equal(s3Stub);
    expect(sut.sns()).to.equal(snsStub);
    expect(sut.systemsManager()).to.equal(systemsManagerStub);

    // expect(autoScalingStub.calledOnce).to.be.true;
    // expect(cloudFormationStub.calledOnce).to.be.true;
    // expect(cognitoStub.calledOnce).to.be.true;
    // expect(dynamoDbStub.calledOnce).to.be.true;
    // expect(ec2Stub.calledOnce).to.be.true;
    // expect(ecsStub.calledOnce).to.be.true;
    // expect(kmsStub.calledOnce).to.be.true;
    // expect(route53Stub.calledOnce).to.be.true;
    // expect(s3Stub.calledOnce).to.be.true;
    // expect(snsStub.calledOnce).to.be.true;
    // expect(systemsManagerStub.calledOnce).to.be.true;

  });

  it('should provide AWS SDK', async () => {
    sut.region('eu-west-2');
    const obj = await sut.sdk((aws, cfg) => ({ cfg }));
    expect(obj.cfg.region).to.equal('eu-west-2');
  });
});