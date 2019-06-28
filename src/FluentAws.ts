export class FluentAws {

}

const fluentAwsInstance = new FluentAws();

export function aws(): FluentAws {
  return fluentAwsInstance;
}