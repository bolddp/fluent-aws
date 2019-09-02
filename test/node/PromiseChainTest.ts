import { expect } from 'chai';
import { PromiseChain } from '../../src/node/PromiseChain';
describe('PromiseChain', () => {
  it('will add and resolve', async () => {
    let messages: string[] = [];
    const sut = new PromiseChain();

    sut.add(() => {
      messages.push('Non volatile');
      return Promise.resolve();
    });
    sut.addVolatile(() => {
      messages.push('Volatile');
      return Promise.resolve();
    });

    await sut.resolve();
    await sut.resolve();

    // The volatile promise should have been executed on both resolve()'s
    expect(messages).to.eql(['Non volatile', 'Volatile', 'Volatile']);

    sut.invalidate();
    messages = [];

    await sut.resolve();
    expect(messages.length).to.equal(0);
  });
});