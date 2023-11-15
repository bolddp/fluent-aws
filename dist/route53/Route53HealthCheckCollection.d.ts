import { ApiNodeCollection } from '../node/ApiNodeCollection';
import { Route53HealthCheck } from './Route53HealthCheck';
import { CreateHealthCheckRequest, HealthCheck } from '@aws-sdk/client-route-53';
export declare class Route53HealthCheckCollection extends ApiNodeCollection<Route53HealthCheck, HealthCheck> {
    apiNodeFromAwsData(awsData: HealthCheck): Route53HealthCheck;
    apiNodeFromId(id: string): Route53HealthCheck;
    load(): Promise<HealthCheck[]>;
    /**
     * Creates a new health check and returns its AWS data on success.
     */
    create(request: CreateHealthCheckRequest): Promise<Route53HealthCheck>;
}
