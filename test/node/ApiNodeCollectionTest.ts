import { TestApiNodeCollection } from './TestApiNodeCollection';

describe('ApiNodeCollection', () => {
  it('should get by id that does not yet exist', () => {
    const sut = new TestApiNodeCollection();
    expect(sut.getById('13')).toEqual('Number 13');
  });

  it('should get by id that does exist', () => {
    const sut = new TestApiNodeCollection();
    expect(sut.getById('11')).toEqual('Number 11');
  });

  it('should find', async () => {
    const sut = new TestApiNodeCollection();

    const found = await sut.find((n) => n == 5 || n == 7);
    expect(found).toEqual(['Number 5', 'Number 7']);
  });

  it('should load awsData', async () => {
    const sut = new TestApiNodeCollection();
    const data = await sut.awsData();

    expect(data).toEqual([1, 3, 5, 7, 11]);
  });
});
