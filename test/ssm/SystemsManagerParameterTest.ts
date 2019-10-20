import { apiNodeCollectionStubs } from '../utils/stubs';
import { AwsApi } from '../../src/awsapi/AwsApi';
import { SystemsManagerParameter } from '../../src/ssm/SystemsManagerParameter';
import { expect } from 'chai';
describe('SystemsManagerParameter', () => {
  it('will load AWS data', async() => {
    const stubs = apiNodeCollectionStubs();
    AwsApi.systemsManager.getParameter = stubs.awsApiStub;

    const sut = new SystemsManagerParameter(<any> stubs.parentStub, 'parameterName');
    await sut.loadAwsData();

    expect(stubs.awsApiStub.calledOnce).to.be.true;
    expect(stubs.awsApiStub.args[0][0]).to.equal('parameterName');
  });

  it('will provide metadata', async() => {
    const stubs = apiNodeCollectionStubs();
    AwsApi.systemsManager.describeParameter = stubs.awsApiStub;

    const sut = new SystemsManagerParameter(<any> stubs.parentStub, 'parameterName');
    await sut.metaData();

    expect(stubs.awsApiStub.calledOnce).to.be.true;
    expect(stubs.awsApiStub.args[0][0]).to.equal('parameterName');
  });
});