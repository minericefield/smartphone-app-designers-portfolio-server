import { DefaultApi } from 'smartphone-app-designers-portfolio-api-docs/server/api';

// TODO: Find batter way and stop using openapi-generator-cli
type Await<T> = T extends {
  then(onfulfilled?: (value: infer U) => unknown): unknown;
}
  ? U
  : T;

export type Designer = Promise<
  Await<ReturnType<DefaultApi['apiDesignerGet']>>['body']
>;
