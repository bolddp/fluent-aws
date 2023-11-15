import { AccountAttribute } from '@aws-sdk/client-ec2';

export interface Ec2AccountAttributes {
  maxInstances: number;
  defaultVpc: string;
}

export class Ec2AccountAttributesMapper {
  static fromAwsData(data: AccountAttribute[]): Ec2AccountAttributes {
    return {
      maxInstances: Number(
        data.find((x) => x.AttributeName == 'max-instances').AttributeValues[0]
          .AttributeValue
      ),
      defaultVpc: data.find((x) => x.AttributeName == 'default-vpc')
        .AttributeValues[0].AttributeValue,
    };
  }
}
