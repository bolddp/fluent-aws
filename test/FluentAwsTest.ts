import { ApiNodeFactory } from '../src/node/ApiNodeFactory';
import { FluentAws, aws } from '../src/FluentAws';

describe('FluentAws', () => {
  let autoScalingStub: jest.Mock<any, any>;
  let cloudFormationStub: jest.Mock<any, any>;
  let cognitoStub: jest.Mock<any, any>;
  let dynamoDbStub: jest.Mock<any, any>;
  let ec2Stub: jest.Mock<any, any>;
  let ecsStub: jest.Mock<any, any>;
  let kmsStub: jest.Mock<any, any>;
  let route53Stub: jest.Mock<any, any>;
  let s3Stub: jest.Mock<any, any>;
  let snsStub: jest.Mock<any, any>;
  let systemsManagerStub: jest.Mock<any, any>;

  let sut: FluentAws;

  beforeAll(() => {
    autoScalingStub = jest.fn();
    autoScalingStub = autoScalingStub.mockReturnValue(autoScalingStub);
    cloudFormationStub = jest.fn();
    cloudFormationStub = cloudFormationStub.mockReturnValue(cloudFormationStub);
    cognitoStub = jest.fn();
    cognitoStub = cognitoStub.mockReturnValue(cognitoStub);
    dynamoDbStub = jest.fn();
    dynamoDbStub = dynamoDbStub.mockReturnValue(dynamoDbStub);
    ec2Stub = jest.fn();
    ec2Stub = ec2Stub.mockReturnValue(ec2Stub);
    ecsStub = jest.fn();
    ecsStub = ecsStub.mockReturnValue(ecsStub);
    kmsStub = jest.fn();
    kmsStub = kmsStub.mockReturnValue(kmsStub);
    route53Stub = jest.fn();
    route53Stub = route53Stub.mockReturnValue(route53Stub);
    s3Stub = jest.fn();
    s3Stub = s3Stub.mockReturnValue(s3Stub);
    snsStub = jest.fn();
    snsStub = snsStub.mockReturnValue(snsStub);
    systemsManagerStub = jest.fn();
    systemsManagerStub = systemsManagerStub.mockReturnValue(systemsManagerStub);

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
    expect(sut.autoScaling()).toEqual(autoScalingStub);
    expect(sut.cloudFormation()).toEqual(cloudFormationStub);
    expect(sut.cognito()).toEqual(cognitoStub);
    expect(sut.dynamoDb()).toEqual(dynamoDbStub);
    expect(sut.ec2()).toEqual(ec2Stub);
    expect(sut.ecs()).toEqual(ecsStub);
    expect(sut.kms()).toEqual(kmsStub);
    expect(sut.route53()).toEqual(route53Stub);
    expect(sut.s3()).toEqual(s3Stub);
    expect(sut.sns()).toEqual(snsStub);
    expect(sut.systemsManager()).toEqual(systemsManagerStub);

    // expect(autoScalingStub).toHaveBeenCalled();
    // expect(cloudFormationStub).toHaveBeenCalled();
    // expect(cognitoStub).toHaveBeenCalled();
    // expect(dynamoDbStub).toHaveBeenCalled();
    // expect(ec2Stub).toHaveBeenCalled();
    // expect(ecsStub).toHaveBeenCalled();
    // expect(kmsStub).toHaveBeenCalled();
    // expect(route53Stub).toHaveBeenCalled();
    // expect(s3Stub).toHaveBeenCalled();
    // expect(snsStub).toHaveBeenCalled();
    // expect(systemsManagerStub).toHaveBeenCalled();
  });
});
