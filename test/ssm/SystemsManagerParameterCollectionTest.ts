import * as sinon from 'sinon';
import { apiNodeCollectionStubs } from '../utils/stubs';
import { AwsApi } from '../../src/awsapi/AwsApi';
import { SystemsManagerParameterCollection } from '../../src/ssm/SystemsManagerParameterCollection';
import { expect } from 'chai';
import { ApiNodeFactory } from '../../src/node/ApiNodeFactory';

describe('SystemsManagerParameterCollection', () => {
  it('will load', async () => {
    const stubs = apiNodeCollectionStubs();
    // 12 parameters will force 2 loads, since only 10 parameters at a time can be fetched

    // For simplicity we return 2 instead of 10
    const getParametersStub = sinon.stub().returns([
      { Name: 'parameter01' },
      { Name: 'parameter02' }
    ]);

    AwsApi.systemsManager = () => (<any>{
      describeParameters: stubs.awsApiStub.returns([
        { Name: 'parameter01' }, { Name: 'parameter02' }, { Name: 'parameter03' }, { Name: 'parameter04' },
        { Name: 'parameter05' }, { Name: 'parameter06' }, { Name: 'parameter07' }, { Name: 'parameter08' },
        { Name: 'parameter09' }, { Name: 'parameter10' }, { Name: 'parameter11' }, { Name: 'parameter12' }
      ]),
      getParameters: getParametersStub
    });

    const sut = new SystemsManagerParameterCollection(<any>stubs.parentStub);
    const parameters = await sut.load();

    expect(stubs.awsApiStub.calledOnce).to.be.true;
    expect(getParametersStub.callCount).to.equal(2);
    expect(parameters.length).to.equal(4); // 2 calls times 2 returned parameters
  });

  it('will create from id', async () => {
    const stubs = apiNodeCollectionStubs();
    ApiNodeFactory.systemsManagerParameter = stubs.factoryStub;

    const sut = new SystemsManagerParameterCollection(<any>stubs.parentStub);

    await sut.apiNodeFromId('parameterName');

    expect(stubs.factoryStub.calledOnce).to.be.true;
    expect(stubs.factoryStub.args[0][0]).to.equal(sut);
    expect(stubs.factoryStub.args[0][1]).to.equal('parameterName');
  });

  it('will create from AWS data', async () => {
    const stubs = apiNodeCollectionStubs();
    ApiNodeFactory.systemsManagerParameter = stubs.factoryStub;
    const awsData: AWS.SSM.Parameter = <any><unknown>{
      Name: 'parameterName'
    }

    const sut = new SystemsManagerParameterCollection(<any>stubs.parentStub);

    await sut.apiNodeFromAwsData(awsData);

    expect(stubs.factoryStub.calledOnce).to.be.true;
    expect(stubs.factoryStub.args[0][0]).to.equal(sut);
    expect(stubs.factoryStub.args[0][1]).to.equal('parameterName');
  });

  it('will provide metadata', async () => {
    const stubs = apiNodeCollectionStubs();
    AwsApi.systemsManager = () => (<any>{
      describeParameters: stubs.awsApiStub
    });

    const sut = new SystemsManagerParameterCollection(<any>stubs.parentStub);
    await sut.metaData();

    expect(stubs.awsApiStub.calledOnce).to.be.true;
  });

  it('will put parameter', async () => {
    const stubs = apiNodeCollectionStubs();
    AwsApi.systemsManager = () => (<any>{
      putParameter: stubs.awsApiStub
    });

    const request: AWS.SSM.PutParameterRequest = {
      Name: 'name',
      Value: 'value',
      Type: 'String'
    }

    const sut = new SystemsManagerParameterCollection(<any>stubs.parentStub);
    await sut.put(request);

    expect(stubs.awsApiStub.calledOnce).to.be.true;
    expect(stubs.awsApiStub.args[0][0]).to.eql(request);
  });
});