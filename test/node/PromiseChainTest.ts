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
    expect(messages).toEqual(['Non volatile', 'Volatile', 'Volatile']);

    sut.invalidate();
    messages = [];

    await sut.resolve();
    expect(messages.length).toEqual(0);
  });

  it('will replace', async () => {
    let messages: string[] = [];
    const sut = new PromiseChain();

    const promise = sut.replace(undefined, () => {
      messages.push('Volatile');
      return Promise.resolve();
    });

    await sut.resolve();
    await sut.resolve();

    expect(messages).toEqual(['Volatile']);

    // Replace the old promise with a new one
    sut.replace(promise, () => {
      messages.push('Replaced Volatile');
      return Promise.resolve();
    });

    await sut.resolve();

    // One old message and one new message expected
    expect(messages).toEqual(['Volatile', 'Replaced Volatile']);
  });

  it('will replace volatile', async () => {
    let messages: string[] = [];
    const sut = new PromiseChain();

    const promise = sut.replaceVolatile(undefined, () => {
      messages.push('Volatile');
      return Promise.resolve();
    });

    await sut.resolve();
    await sut.resolve();

    expect(messages).toEqual(['Volatile', 'Volatile']);

    // Replace the old promise with a new one
    sut.replaceVolatile(promise, () => {
      messages.push('Replaced Volatile');
      return Promise.resolve();
    });

    await sut.resolve();

    // One new message at the end expected, from the replaced promise
    expect(messages).toEqual(['Volatile', 'Volatile', 'Replaced Volatile']);
  });
});
