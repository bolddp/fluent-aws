import { apiNodeCollectionStubs } from '../utils/stubs';
import { AwsApi } from '../../src/awsapi/AwsApi';
import { CloudFormationStack } from '../../src/cf/CloudFormationStack';

describe('CloudFormationStackTest', () => {
  it('will load awsData', async () => {
    const stubs = apiNodeCollectionStubs();
    const awsApiStub = jest.fn().mockReturnValue({});
    AwsApi.cloudFormation = () =>
      <any>{
        describeStack: awsApiStub,
      };

    const sut = new CloudFormationStack(<any>stubs.parentStub, 'stackName');
    await sut.loadAwsData();

    expect(awsApiStub).toHaveBeenCalledWith('stackName');
  });

  it('will provide resources', async () => {
    const stubs = apiNodeCollectionStubs();
    const awsApiStub = jest.fn().mockReturnValue({});
    AwsApi.cloudFormation = () =>
      <any>{
        listStackResources: awsApiStub,
      };

    const sut = new CloudFormationStack(<any>stubs.parentStub, 'stackName');
    await sut.resources();

    expect(awsApiStub).toHaveBeenCalledWith('stackName');
  });

  it('will provide template', async () => {
    const stubs = apiNodeCollectionStubs();
    const awsApiStub = jest.fn().mockReturnValue({});
    AwsApi.cloudFormation = () =>
      <any>{
        getTemplate: awsApiStub,
      };

    const sut = new CloudFormationStack(<any>stubs.parentStub, 'stackName');
    await sut.template();

    expect(awsApiStub).toHaveBeenCalledWith('stackName');
  });

  it('will check drift', async () => {
    const stubs = apiNodeCollectionStubs();
    const detectStub = jest.fn().mockReturnValue('detectionId');
    const detectionStatusStub = jest.fn().mockReturnValue('DETECTION_COMPLETE');
    const resourceDriftsStub = jest
      .fn()
      .mockReturnValue([{ StackId: 'stackId' }]);
    AwsApi.cloudFormation = () =>
      <any>{
        detectStackDrift: detectStub,
        describeStackDriftDetectionStatus: detectionStatusStub,
        describeStackResourceDrifts: resourceDriftsStub,
      };

    const sut = new CloudFormationStack(<any>stubs.parentStub, 'stackName');
    const drift = await sut.checkDrift(1);

    expect(drift.length).toEqual(1);
    expect(drift[0].StackId).toEqual('stackId');
  });

  it('will handle failed drift', async () => {
    const stubs = apiNodeCollectionStubs();
    const detectStub = jest.fn().mockReturnValue('detectionId');
    const detectionStatusStub = jest.fn().mockReturnValue('DETECTION_FAILED');
    const resourceDriftsStub = jest.fn().mockReturnValue([
      {
        StackId: 'stackId',
      },
    ]);
    AwsApi.cloudFormation = () =>
      <any>{
        detectStackDrift: detectStub,
        describeStackDriftDetectionStatus: detectionStatusStub,
        describeStackResourceDrifts: resourceDriftsStub,
      };

    const sut = new CloudFormationStack(<any>stubs.parentStub, 'stackName');

    let thrownError: Error;
    await sut.checkDrift(1).catch((error) => (thrownError = error));
    expect(thrownError).toBeDefined();
    expect(
      thrownError.message.startsWith(
        'Drift detection failed! Available drift info:'
      )
    ).toEqual(true);
  });
});
