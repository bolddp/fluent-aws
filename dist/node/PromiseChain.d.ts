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
export declare class PromiseChain {
    chain: (() => Promise<void>)[];
    volatileChain: (() => Promise<void>)[];
    resolved: Promise<void>;
    add(link: () => Promise<void>): void;
    addVolatile(link: () => Promise<void>): void;
    invalidate(): void;
    resolve(): Promise<void>;
}
