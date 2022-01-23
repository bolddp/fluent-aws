import { apiNodeCollectionStubs } from '../utils/stubs';
import { EcsService } from '../../src/ecs/EcsService';

import { AwsApi } from '../../src/awsapi/AwsApi';

describe('EcsService', () => {
  it('will load awsData', async () => {
    const stubs = apiNodeCollectionStubs();
    const awsApiStub = jest.fn().mockReturnValue({});
    AwsApi.ecs = () =>
      <any>{
        describeService: awsApiStub,
      };

    const sut = new EcsService(<any>stubs.parentStub, 'clusterId', 'serviceId');
    await sut.loadAwsData();

    expect(awsApiStub).toHaveBeenCalledWith('clusterId', 'serviceId');
  });
});
