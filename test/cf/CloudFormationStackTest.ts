import * as sinon from 'sinon';
import { apiNodeCollectionStubs } from '../utils/stubs';
import { AwsApi } from '../../src/awsapi/AwsApi';
import { CloudFormationStack } from '../../src/cf/CloudFormationStack';
import { expect } from 'chai';

describe('CloudFormationStackTest', () => {
  it('will load awsData', async () => {
    const stubs = apiNodeCollectionStubs();
    const awsApiStub = sinon.stub().returns({});
    AwsApi.cloudFormation = () => (<any>{
      describeStack: awsApiStub
    });

    const sut = new CloudFormationStack(<any>stubs.parentStub, 'stackName');
    await sut.loadAwsData();

    expect(awsApiStub.calledOnce).to.be.true;
    expect(awsApiStub.args[0][0]).to.equal('stackName');
  });

  it('will provide resources', async () => {
    const stubs = apiNodeCollectionStubs();
    const awsApiStub = sinon.stub().returns({});
    AwsApi.cloudFormation = () => (<any>{
      listStackResources: awsApiStub
    });

    const sut = new CloudFormationStack(<any> stubs.parentStub, 'stackName');
    await sut.resources();

    expect(awsApiStub.calledOnce).to.be.true;
    expect(awsApiStub.args[0][0]).to.equal('stackName');
  });

  it('will provide template', async () => {
    const stubs = apiNodeCollectionStubs();
    const awsApiStub = sinon.stub().returns({});
    AwsApi.cloudFormation = () => (<any>{
      getTemplate: awsApiStub
    });

    const sut = new CloudFormationStack(<any> stubs.parentStub, 'stackName');
    await sut.template();

    expect(awsApiStub.calledOnce).to.be.true;
    expect(awsApiStub.args[0][0]).to.equal('stackName');
  });

  it('will check drift', async () => {
    const stubs = apiNodeCollectionStubs();
    const detectStub = sinon.stub().returns('detectionId');
    const detectionStatusStub = sinon.stub().returns('DETECTION_COMPLETE');
    const resourceDriftsStub = sinon.stub().returns([{ StackId: 'stackId' }]);
    AwsApi.cloudFormation = () => (<any>{
      detectStackDrift: detectStub,
      describeStackDriftDetectionStatus: detectionStatusStub,
      describeStackResourceDrifts: resourceDriftsStub
    });

    const sut = new CloudFormationStack(<any> stubs.parentStub, 'stackName');
    const drift = await sut.checkDrift(1);

    expect(drift.length).to.equal(1);
    expect(drift[0].StackId).to.equal('stackId');
  });

  it('will handle failed drift', async () => {
    const stubs = apiNodeCollectionStubs();
    const detectStub = sinon.stub().returns('detectionId');
    const detectionStatusStub = sinon.stub().returns('DETECTION_FAILED');
    const resourceDriftsStub = sinon.stub().returns([{
      StackId: 'stackId'
    }])
    AwsApi.cloudFormation = () => (<any>{
      detectStackDrift: detectStub,
      describeStackDriftDetectionStatus: detectionStatusStub,
      describeStackResourceDrifts: resourceDriftsStub
    });

    const sut = new CloudFormationStack(<any> stubs.parentStub, 'stackName');

    let thrownError: Error;
    await sut.checkDrift(1)
      .catch(error => thrownError = error);
    expect(thrownError).to.not.undefined;
    expect(thrownError.message.startsWith('Drift detection failed! Available drift info:')).to.be.true;
  });
});