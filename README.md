# Goals of API

Configure and assume role (during development)
```ts
aws().configure({
  region: 'eu-west-1'
})
.assumeRole('roleArn')
```

Access across AWS services
```ts
// Bridge from ECS task to the EC2 container its running on
const ipAddress = await aws().ecs()
  .cluster('clusterArn')
  .task('taskArn').instance().publicIpAddress();
```

Logical representation of AWS objects, e.g. a S3 bucket, for multiple operations on the same object
```ts
const bucket = await aws().s3()
  .bucket('bucketName')
  .createIfNotExists(bucketConfig);

await bucket.write('fileName', fileContentsBuffer);
const readFileBuffer = await bucket.read('fileName');
```

