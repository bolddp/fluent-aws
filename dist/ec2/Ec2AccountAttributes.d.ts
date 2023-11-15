import { AccountAttribute } from '@aws-sdk/client-ec2';
export interface Ec2AccountAttributes {
    maxInstances: number;
    defaultVpc: string;
}
export declare class Ec2AccountAttributesMapper {
    static fromAwsData(data: AccountAttribute[]): Ec2AccountAttributes;
}
