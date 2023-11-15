import { ApiNodeCollection } from '../node/ApiNodeCollection';
import { Ec2Instance } from './Ec2Instance';
import { Instance } from '@aws-sdk/client-ec2';
export declare class Ec2InstanceCollection extends ApiNodeCollection<Ec2Instance, Instance> {
    instanceIds?: string[];
    apiNodeFromId(id: string): Ec2Instance;
    apiNodeFromAwsData(data: Instance): Ec2Instance;
    load(): Promise<Instance[]>;
}
