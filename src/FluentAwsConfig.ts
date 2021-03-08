import { Credentials } from "aws-sdk";
import { CredentialsOptions } from "aws-sdk/lib/credentials";

/**
 * A subset of the AWS configuration concerning credentials and region.
 */
export interface FluentAwsConfig {
  region?: string;
  credentials?: Credentials|CredentialsOptions|null;
}