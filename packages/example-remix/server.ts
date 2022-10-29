import {MethodNotAllowedError} from "@cloudflare/kv-asset-handler";
import type {AppLoadContext} from "@remix-run/cloudflare";
import {createRequestHandler} from "@remix-run/cloudflare";
import * as build from "@remix-run/dev/server-build";
import type {Context} from "hono";
import {Hono} from "hono";
import {logger} from "hono/logger";

const handleRemixRequest = createRequestHandler(
  build,
  process.env.NODE_ENV
);
const handleRequest = (
  c: Context<
    string,
    {
      Bindings: RemixEnv;
    }
  >
) => {
  const env = c.env;

  //   To Remix
  //   ここで必要な場合はキャッシュの制御やセッションETagの用意などを行う
  const loadContext: AppLoadContext = { env };
  return handleRemixRequest(c.req, loadContext);
};

const app = new Hono<{ Bindings: RemixEnv }>();
app.use(
  "*",
  logger((log) => {
    console.log(`🕺REMIX_LOG💃:${log}`);
  })
);

app.get("/*", async (c) => {
  return handleRequest(c);
});

app.onError((error, c) => {
  console.error(error);

  if (error instanceof MethodNotAllowedError) {
    return c.text("Method not allowed: 405", 405);
  }

  return c.text(
    "An unexpected error occurred: 500",
    500
  );
});

export default app;
