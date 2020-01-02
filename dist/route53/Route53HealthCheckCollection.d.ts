import { ApiNodeCollection } from '../node/ApiNodeCollection';
import { Route53HealthCheck } from './Route53HealthCheck';
export declare class Route53HealthCheckCollection extends ApiNodeCollection<Route53HealthCheck, AWS.Route53.HealthCheck> {
    apiNodeFromAwsData(awsData: AWS.Route53.HealthCheck): Route53HealthCheck;
    apiNodeFromId(id: string): Route53HealthCheck;
    load(): Promise<AWS.Route53.HealthCheck[]>;
    /**
     * Creates a new health check and returns its AWS data on success.
     */
    create(request: AWS.Route53.CreateHealthCheckRequest): Promise<Route53HealthCheck>;
}
