declare module "__STATIC_CONTENT_MANIFEST" {
  const manifestJSON: string;
  export default manifestJSON;
}

type RootEnv = {
  REMIX: Fetcher;
  HONO_API: Fetcher;

  SESSION_SECRET: string;
};

type APIEnv = {
  SESSION_SECRET: string;
};

type RemixCacheEnv = {
  REMIX: Fetcher;
};

type RemixEnv = {
  REMIX_SSR: Fetcher;
};
