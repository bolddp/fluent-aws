import { expect } from 'chai';
import { ApiNodeFactory } from '../../src/node/ApiNodeFactory';
import { apiNodeCollectionStubs } from '../utils/stubs';
import { CloudFormation } from '../../src/cf/CloudFormation';

describe('CloudFormation', () => {
  it('will provide access to stacks', async () => {
    const stubs = apiNodeCollectionStubs();
    ApiNodeFactory.cloudFormationStackCollection = stubs.factoryStub;

    const sut = new CloudFormation(<any> stubs.parentStub);

    await sut.stacks().ensureResolved();
    expect(stubs.factoryStub.calledOnce).to.be.true;
  });

  it('will provide access to a stack', async () => {
    const stubs = apiNodeCollectionStubs();
    ApiNodeFactory.cloudFormationStackCollection = stubs.factoryStub;

    const sut = new CloudFormation(<any> stubs.parentStub);

    await sut.stack('stackName').ensureResolved();

    expect(stubs.factoryStub.calledOnce).to.be.true;
    expect(stubs.getByIdStub.calledOnce).to.be.true;
    expect(stubs.getByIdStub.args[0][0]).to.equal('stackName');
  });
});