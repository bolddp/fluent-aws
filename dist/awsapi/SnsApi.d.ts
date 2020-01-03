import * as AWS from 'aws-sdk';
export declare class SnsApi {
    sns: () => AWS.SNS;
    listTopics(): Promise<AWS.SNS.Topic[]>;
    publish(input: AWS.SNS.PublishInput): Promise<void>;
}
