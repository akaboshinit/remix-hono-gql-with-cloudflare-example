import type { DataFunctionArgs as RemixDataFunctionArgs } from "@remix-run/cloudflare";

export interface AppLoadContext {
  env: RemixEnv;
}

export interface DataFunctionArgs
  extends Omit<RemixDataFunctionArgs, "context"> {
  context: AppLoadContext;
}

export interface ActionFunction {
  (args: DataFunctionArgs):
    | null
    | Response
    | Promise<Response>;
}

export interface LoaderFunction {
  (args: DataFunctionArgs):
    | null
    | Response
    | Promise<Response>;
}
