import { ApiNode } from '../node/ApiNode';
import { SystemsManagerParameterCollection } from './SystemsManagerParameterCollection';
export declare class SystemsManager extends ApiNode {
    parameterCollection: SystemsManagerParameterCollection;
    constructor(parent: ApiNode);
    parameters(): SystemsManagerParameterCollection;
    parameter(parameterName: string): import("./SystemsManagerParameter").SystemsManagerParameter;
}
