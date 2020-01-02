import { ApiNodeCollection } from "../node/ApiNodeCollection";
import { Ec2Instance } from "./Ec2Instance";
export declare class Ec2InstanceCollection extends ApiNodeCollection<Ec2Instance, AWS.EC2.Instance> {
    instanceIds?: string[];
    apiNodeFromId(id: string): Ec2Instance;
    apiNodeFromAwsData(data: AWS.EC2.Instance): Ec2Instance;
    load(): Promise<AWS.EC2.Instance[]>;
}
