"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ec2AccountAttributesMapper = void 0;
class Ec2AccountAttributesMapper {
    static fromAwsData(data) {
        return {
            maxInstances: Number(data.find((x) => x.AttributeName == 'max-instances').AttributeValues[0]
                .AttributeValue),
            defaultVpc: data.find((x) => x.AttributeName == 'default-vpc')
                .AttributeValues[0].AttributeValue,
        };
    }
}
exports.Ec2AccountAttributesMapper = Ec2AccountAttributesMapper;
