import { ApiNodeCollection } from '../../src/node/ApiNodeCollection';
export class TestApiNodeCollection extends ApiNodeCollection<string, number> {
  constructor() {
    super(undefined);
  }

  async load() {
    return [1, 3, 5, 7, 11];
  }

  apiNodeFromAwsData(data: number): string {
    return `Number ${data}`;
  }

  apiNodeFromId(id: string): string {
    return `Number ${id}`;
  }
}