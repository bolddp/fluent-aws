# CLAUDE.md — fluent-aws

## Project overview

**fluent-aws** is a TypeScript library (published to npm) that wraps the AWS SDK v3 in a fluent, Promise-based API. Consumers chain calls to navigate the AWS resource hierarchy rather than constructing SDK clients manually.

```ts
await aws()
  .region('eu-west-1')
  .assumeRole('roleArn', 'sessionName')
  .ecs()
  .cluster('clusterArn')
  .task('taskArn')
  .ec2Instance()
  .awsData();
```

---

## Tech stack

- **Language:** TypeScript 5.7, targeting ES6, `commonjs` modules
- **AWS SDK:** v3 (`@aws-sdk/client-*` packages at 3.x)
- **Testing:** Jest 29 + ts-jest; HTML reporter via jest-stare
- **Build:** `tsc` → `dist/`; no bundler
- **Node version:** Node 22 (types)

---

## Repository layout

```
src/
├── index.ts                    # All public exports
├── FluentAws.ts                # Root entry point; exports aws() factory function
├── FluentAwsConfig.ts          # { region?, credentials? }
├── node/                       # Base class hierarchy (see Architecture below)
│   ├── ApiNode.ts
│   ├── ApiNodeCollection.ts
│   ├── ApiNodeFactory.ts       # Static factory for every node type
│   ├── AwsDataApiNode.ts
│   └── PromiseChain.ts
├── awsapi/                     # Thin wrappers around AWS SDK clients
│   ├── AwsApi.ts               # Dispatcher: AwsApi.s3(config), AwsApi.ecs(config), ...
│   ├── CognitoApi.ts
│   ├── DynamoDbApi.ts
│   └── ...one file per service
└── <service>/                  # One folder per AWS service
    ├── <Service>.ts            # Root node (extends ApiNode)
    ├── <Entity>.ts             # Item node (extends AwsDataApiNode or ApiNode)
    └── <Entity>Collection.ts   # Collection node (extends ApiNodeCollection)

test/
├── utils/stubs.ts              # Shared mocks/stubs for all tests
└── <service>/                  # Mirrors src/ structure
    └── <Entity>Test.ts
```

---

## Architecture

### Node hierarchy

Every object in the API is an **ApiNode**. They form a tree:

```
FluentAws (root)
└── Service (e.g. S3, Ecs)
    └── Collection (e.g. S3BucketCollection)
        └── Item (e.g. S3Bucket)
            └── Sub-collection / sub-item
```

| Base class | Use when |
|---|---|
| `ApiNode` | Service roots, items that don't load AWS data themselves |
| `AwsDataApiNode<T>` | Items that load a specific AWS resource (implements `loadAwsData()`) |
| `ApiNodeCollection<TNode, TAwsData>` | Collections that list resources (implements `load()`) |

### PromiseChain

`FluentAws` uses `PromiseChain` to queue setup operations (region, credentials, assume-role) so they execute in order before the first real AWS call. `ensureResolved()` drains the queue. Normal chain entries are cached; _volatile_ entries re-run on every resolve.

### ApiNodeFactory

All node construction goes through `ApiNodeFactory` static methods. This is the single place to touch when adding a new service. It also makes nodes trivially mockable in tests (replace the static method).

### AwsApi dispatcher

`AwsApi.<service>(config)` returns the service-specific API wrapper. Every `*Api.ts` file constructs a fresh SDK client per call (passing the resolved config). Tests replace `AwsApi.<service>` with a jest mock.

---

## Naming conventions

| Thing | Convention | Example |
|---|---|---|
| Service root | PascalCase = AWS service name | `S3.ts`, `Ecs.ts`, `DynamoDb.ts` |
| Collection | `<Entity>Collection` | `S3BucketCollection.ts` |
| API wrapper | `<Service>Api` | `S3Api.ts`, `CognitoApi.ts` |
| Test file | `<Source>Test.ts` | `EcsClusterTest.ts` |
| Service directory | camelCase | `s3/`, `dynamoDb/`, `ssm/` |
| Plural accessor | matches collection | `bucket.objects()`, `ecs.clusters()` |
| Singular accessor | same name without suffix | `bucket.object(key)`, `ecs.cluster(id)` |

Test files use the suffix `Test.ts` (not `_test.ts`).

---

## Adding a new AWS service

Follow these steps in order. Use any existing service (e.g. `src/sns/`) as a concrete reference.

1. **Install the SDK package** — `npm install @aws-sdk/client-<service>`
2. **`src/awsapi/<Service>Api.ts`** — one method per SDK operation; accept and forward `FluentAwsConfig`
3. **`src/awsapi/AwsApi.ts`** — add `static <service> = (config) => new <Service>Api(config)`
4. **`src/<service>/<Service>.ts`** — extends `ApiNode`; exposes collection and singular accessors
5. **`src/<service>/<Entity>Collection.ts`** — extends `ApiNodeCollection`; implements `load()` and `apiNodeFromAwsData()` / `apiNodeFromId()`
6. **`src/<service>/<Entity>.ts`** — extends `AwsDataApiNode`; implements `loadAwsData()`; add operation methods
7. **`src/node/ApiNodeFactory.ts`** — add static factory methods for every new node type
8. **`src/FluentAws.ts`** — add accessor method (e.g. `lambda(): Lambda`)
9. **`src/index.ts`** — export all new public classes
10. **`test/<service>/<Entity>Test.ts`** — mock `AwsApi.<service>` and `ApiNodeFactory` methods; assert delegation

---

## Testing

```bash
npm test          # run all tests
npm run coverage  # run with coverage report
```

- Framework: Jest + ts-jest
- Test files match `*Test.ts`; placed under `test/` mirroring `src/`
- Shared stubs live in `test/utils/stubs.ts` — always check there before creating new mocks
- Integration test config: `jest.itest.config.json` (separate from unit tests)

---

## Build & publish

```bash
npm run build         # tsc → dist/ (no sourcemaps)
npm run npm:publish   # build then npm publish
```

The `dist/` directory contains the compiled JS and `.d.ts` files that consumers receive. It is committed to the repo.

---

## Services implemented

| Service | Root class | Key operations |
|---|---|---|
| AutoScaling | `AutoScaling` | list/describe groups, set instance protection |
| CloudFormation | `CloudFormation` | describe stacks, detect drift, list resources |
| Cognito | `Cognito` | user pools, signup, login, refresh, group management, email search |
| DynamoDB | `DynamoDb` | get, query, queryByIndex, put, delete, batchGet |
| EC2 | `Ec2` | describe instances, account attributes |
| ECS | `Ecs` | clusters, tasks, services; cross-service to EC2 |
| IAM | (no root) | `IamRole` accessed via Ec2Instance |
| KMS | `Kms` | keys and aliases |
| Route53 | `Route53` | hosted zones, health checks, record sets |
| S3 | `S3` | buckets, objects (read/write/delete/copy/presign) |
| SNS | `Sns` | topics, publish |
| SQS | `Sqs` | queues, send (single + batch) |
| SSM | `SystemsManager` | parameters (get/put/describe by path) |

---

## Key types

```ts
// src/FluentAwsConfig.ts
interface FluentAwsConfig {
  region?: string;
  credentials?: AwsCredentialIdentity | Provider<AwsCredentialIdentity> | null;
}

// src/cognito/CognitoUserPool.ts
interface CognitoUserPoolId { poolId: string; clientId?: string; }
interface CognitoSignupData { userName: string; password: string; attributes: ...; skipVerification?: boolean; }

// src/dynamoDb/DynamoDbTable.ts
type DynamoDbItem = { [key: string]: any };
type DynamoDbKey  = { [key: string]: any };
```
