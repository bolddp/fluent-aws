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
    expect(stubs.factoryStub).toHaveBeenCalled();
  });

  it('will provide access to a cluster', async () => {
    const stubs = apiNodeCollectionStubs();
    ApiNodeFactory.ec2InstanceCollection = stubs.factoryStub;

    const sut = new Ec2(<any>stubs.parentStub);

    await sut.instance('instanceId').ensureResolved();

    expect(stubs.factoryStub).toHaveBeenCalled();
    expect(stubs.getByIdStub).toHaveBeenCalledWith('instanceId');
  });

  it('will get account attributes', async () => {
    const stubs = apiNodeCollectionStubs();
    AwsApi.ec2 = () =>
      <any>{
        describeAccountAttributes: stubs.awsApiStub.mockReturnValue([
          {
            AttributeName: 'max-instances',
            AttributeValues: [{ AttributeValue: '42' }],
          },
          {
            AttributeName: 'default-vpc',
            AttributeValues: [{ AttributeValue: 'default_vpc' }],
          },
        ]),
      };

    const sut = new Ec2(<any>stubs.parentStub);

    const attributes = await sut.accountAttributes();
    expect(stubs.awsApiStub).toHaveBeenCalled();
    expect(attributes.maxInstances).toEqual(42);
    expect(attributes.defaultVpc).toEqual('default_vpc');
  });
});
