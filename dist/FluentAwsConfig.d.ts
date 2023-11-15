import { AwsCredentialIdentity, Provider } from '@aws-sdk/types';
/**
 * A subset of the AWS configuration concerning credentials and region.
 */
export interface FluentAwsConfig {
    region?: string;
    credentials?: AwsCredentialIdentity | Provider<AwsCredentialIdentity> | null;
}
