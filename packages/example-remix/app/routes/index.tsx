import { json } from "@remix-run/cloudflare";
import {
  Link,
  useLoaderData,
} from "@remix-run/react";
import type { LoaderFunction } from "..";

const isClient = () =>
  typeof window !== "undefined";

export const loader: LoaderFunction = async ({
    request,
  context,
}) => {
  console.log("loader:isClient", isClient());
  console.log("pageEnv", context.env);

  return json({ success: true }, 200);
};

export default function Index() {
  const loader = useLoaderData();
  console.log("page:isClient", isClient());
  //   console.log("env", process);

  return (
    <div
      style={{
        fontFamily: "system-ui, sans-serif",
        lineHeight: "1.4",
      }}
    >
      <h1>
        Welcome to Remix-hono with Cloudflare
      </h1>
      <Link to={"/info"}>To Info</Link>
      <ul>
        <li>
          <a
            target="_blank"
            href="https://remix.run/tutorials/blog"
            rel="noreferrer"
          >
            15m Quickstart Blog Tutorial
          </a>
        </li>
        <li>
          <a
            target="_blank"
            href="https://remix.run/tutorials/jokes"
            rel="noreferrer"
          >
            Deep Dive Jokes App Tutorial
          </a>
        </li>
        <li>
          <a
            target="_blank"
            href="https://remix.run/docs"
            rel="noreferrer"
          >
            Remix Docs
          </a>
        </li>
      </ul>
    </div>
  );
}
