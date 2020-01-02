"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
class PromiseChain {
    constructor() {
        this.chain = [];
        this.volatileChain = [];
    }
    add(link) {
        this.resolved = undefined;
        this.chain.push(link);
    }
    addVolatile(link) {
        this.volatileChain.push(link);
    }
    invalidate() {
        this.resolved = undefined;
        this.chain = [];
        this.volatileChain = [];
    }
    resolve() {
        if (!this.resolved) {
            this.resolved = this.chain.reduce((p, c) => p.then(c), Promise.resolve());
        }
        return this.volatileChain.reduce((p, c) => p.then(c), this.resolved);
    }
}
exports.PromiseChain = PromiseChain;
