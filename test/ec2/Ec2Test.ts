import { expect } from 'chai';
import { ApiNodeFactory } from '../../src/node/ApiNodeFactory';
import { apiNodeCollectionStubs } from '../utils/stubs';
import { Ec2 } from '../../src/ec2/Ec2';
import { AwsApi } from '../../src/awsapi/AwsApi';

describe('Ec2', () => {
  it('will provide access to clusters', async () => {
    const stubs = apiNodeCollectionStubs();
    ApiNodeFactory.ec2InstanceCollection = stubs.factoryStub;

    const sut = new Ec2(<any>stubs.parentStub);

    await sut.instances().ensureResolved();
    expect(stubs.factoryStub.calledOnce).to.be.true;
  });

  it('will provide access to a cluster', async () => {
    const stubs = apiNodeCollectionStubs();
    ApiNodeFactory.ec2InstanceCollection = stubs.factoryStub;

    const sut = new Ec2(<any>stubs.parentStub);

    await sut.instance('instanceId').ensureResolved();

    expect(stubs.factoryStub.calledOnce).to.be.true;
    expect(stubs.getByIdStub.calledOnce).to.be.true;
    expect(stubs.getByIdStub.args[0][0]).to.equal('instanceId');
  });

  it('will get account attributes', async () => {
    const stubs = apiNodeCollectionStubs();
    AwsApi.ec2 = () => (<any>{
      describeAccountAttributes: stubs.awsApiStub.returns([
        { AttributeName: 'max-instances', AttributeValues: [{ AttributeValue: '42' }] },
        { AttributeName: 'default-vpc', AttributeValues: [{ AttributeValue: 'default_vpc' }] }
      ])
    });

    const sut = new Ec2(<any>stubs.parentStub);

    const attributes = await sut.accountAttributes();
    expect(stubs.awsApiStub.calledOnce).to.be.true;
    expect(attributes.maxInstances).to.equal(42);
    expect(attributes.defaultVpc).to.equal('default_vpc');
  });

});