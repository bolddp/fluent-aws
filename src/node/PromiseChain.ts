/**
 * Holds an array of promise factory functions that can be chained together
 * and executed. The factory functions can either by static or volatile.
 * The promises produced by the static functions are only executed once, while
 * the volatile promises are executed on each resolve.
 *
 * An example of a volatile promise would be one that configures what region to
 * address. If there are multiple aws() instances running simultaneously, for
 * instance to copy files between regions, the AWS.config, which is a singleton,
 * needs to be updated every time some object in the Fluent API is resolved.
 */
export class PromiseChain {
  chain: (() => Promise<void>)[] = [];
  volatileChain: (() => Promise<void>)[] = [];
  resolved: Promise<void>;

  add(promise: () => Promise<void>) {
    this.resolved = undefined;
    this.chain.push(promise);
  }

  addVolatile(promise: () => Promise<void>) {
    this.volatileChain.push(promise);
  }

  /**
   * Replaces a promise in the promise chain and resets the resolve flag, which will cause the
   * promises in the chain to run again once on next ensureResolve().
   */
  replace(currentPromise: () => Promise<void>, newPromise: () => Promise<void>): () => Promise<void> {
    const index = this.chain.indexOf(currentPromise);
    if (index >= 0) {
      this.chain[index] = newPromise;
    } else {
      this.chain.push(newPromise);
    }
    this.resolved = undefined;
    return newPromise;
  }

  /**
   * Replaces a volatile promise in the promise chain.
   */
  replaceVolatile(currentPromise: () => Promise<void>, newPromise: () => Promise<void>): () => Promise<void> {
    const index = this.volatileChain.indexOf(currentPromise);
    if (index >= 0) {
      this.volatileChain[index] = newPromise;
    } else {
      this.volatileChain.push(newPromise);
    }
    return newPromise;
  }

  invalidate() {
    this.resolved = undefined;
    this.chain = [];
    this.volatileChain = [];
  }

  resolve(): Promise<void> {
    if (!this.resolved) {
      this.resolved = this.chain.reduce((p, c) => p.then(c), Promise.resolve());
    }
    return this.volatileChain.reduce((p, c) => p.then(c), this.resolved);
  }
}