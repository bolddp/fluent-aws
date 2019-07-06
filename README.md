# fluent-aws

A fluent, Promise based Amazon Web Services API, with a goal of being intuitive and easy to use.

The official AWS SDK is huge, and compatibility with it in **fluent-aws** will be added on a need-to-have basis for me personally. But pull requests to expand the SDK is most welcome!

The documentation for the API can be found [here](https://github.com/bolddp/fluent-aws/wiki/Documentation).
## Some introductory sample code

Configure and assume role
```ts
aws().configure({
  region: 'eu-west-1'
})
.assumeRole('roleArn') // Handy during development on dev computer
```

Fluent access across AWS services
```ts
// Bridge from ECS task to the EC2 container its running on
const ec2Instance = await aws().ecs()
  .cluster('clusterArn')
  .task('taskArn')
  .ec2Instance().awsData();

expect(ec2Instance.PublicIpAddress).to.equal('1.2.3.4');
```

Logical representation of AWS objects, e.g. a S3 bucket, for multiple operations on the same object
```ts
const bucket = await aws().s3()
  .bucket('bucketName')
  .createIfNotExists()
  .resolve();

await bucket.object('fileName').writeString('Howdy partner!');
const str = await bucket.object('fileName').readString();
await bucket.object('fileName').delete();
```

