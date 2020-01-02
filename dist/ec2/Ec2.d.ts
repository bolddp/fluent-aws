import { Ec2AccountAttributes } from './Ec2AccountAttributes';
import { Ec2Instance } from "./Ec2Instance";
import { ApiNode } from "../node/ApiNode";
import { Ec2InstanceCollection } from "./Ec2InstanceCollection";
export declare class Ec2 extends ApiNode {
    instanceCollection: Ec2InstanceCollection;
    constructor(parent: ApiNode);
    instances(): Ec2InstanceCollection;
    instance(id: string): Ec2Instance;
    accountAttributes(): Promise<Ec2AccountAttributes>;
}
