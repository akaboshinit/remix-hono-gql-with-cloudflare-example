import { Hono } from "hono";
import { logger } from "hono/logger";

const app = new Hono<{ Bindings: RootEnv }>();
app.use(
  "*",
  logger((log) => {
    // console.log(`👩‍💻ROOT_API_HONO_LOG🧑‍💻:${log}`);
  })
);

app.get("/api/*", async (c) => {
  const apiResponse = await c.env.HONO_API.fetch(
    c.req.clone()
  );
  if (!apiResponse.ok) {
    throw new Error(await apiResponse.json());
  }
  return apiResponse;
});

app.get("/*", async (c) => {
  console.log("env", c.env);

  const remixResponse = await c.env.REMIX.fetch(
    c.req.clone()
  );
  if (!remixResponse.ok) {
    throw new Error(await remixResponse.json());
  }

  return remixResponse;
});

app.onError((error, c) => {
  console.error(error);

  return c.text(
    "An unexpected error occurred: 500",
    500
  );
});

export default app;
