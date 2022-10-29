import type { LoaderFunction } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";

const isClient = () =>
  typeof window !== "undefined";

export const loader: LoaderFunction = async ({
  request,
}) => {
  console.log("loader:isClient", isClient());
  return json(
    { success: true, infoPage: true },
    200
  );
};

export default function Index() {
  console.log("page:isClient", isClient());

  return (
    <div
      style={{
        fontFamily: "system-ui, sans-serif",
        lineHeight: "1.4",
      }}
    >
      <h1>
        Info Info Info Info Info Info Welcome to
        Remix-hono with Cloudflare
      </h1>
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
