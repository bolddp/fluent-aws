import { ApiNode } from "./ApiNode";

/**
 * Base class for nodes that represents a collection in the API, e.g.
 * all the EC2 instances in the account or all services in an ECS cluster.
 */
export abstract class ApiNodeCollection<T, TAwsData> extends ApiNode {
  nodeMap: Map<string, T> = new Map();

  constructor(parent: ApiNode) {
    super(parent);
  }

  protected abstract load(): Promise<TAwsData[]>;

  protected abstract apiNodeFromAwsData(data: TAwsData): T;

  protected abstract apiNodeFromId(id: string): T;

  /**
   * Looks for an API Node by its id, e.g. the InstanceId of an EC2 instance.
   * If none is found, an instance is created and added to the map.
   */
  getById(id: string): T {
    let item = this.nodeMap.get(id);
    if (!item) {
      item = this.apiNodeFromId(id);
      this.nodeMap.set(id, item);
    }
    return item;
  }

  async find(predicate: (o: TAwsData) => boolean): Promise<T[]> {
    await this.ensureResolved();
    const result: T[] = [];
    const awsDatas = await this.load();
    for (const awsData of awsDatas) {
      if (predicate(awsData)) {
        result.push(this.apiNodeFromAwsData(awsData));
      }
    }
    return result;
  }

  /**
   * Retrieves the AWS SDK data for this collection.
   */
  async awsData(): Promise<TAwsData[]> {
    await this.ensureResolved();
    return await this.load();
  }
}