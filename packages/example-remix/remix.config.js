const IS_SSR = process.env.SSR;
const IS_WORKER_SPREAD =
  !!process.env.WORKER_SPREAD;

const {
  withEsbuildOverride,
} = require("remix-esbuild-override");
const remixServiceBindings =
  require("remix-service-bindings-fork").default;

withEsbuildOverride((option, { isServer }) => {
  if (isServer) {
    option.plugins = [
      /**
       * remixServiceBindings
       * @param isEdgeSide {boolean} - When this is true, the build is for edge (binder) and when false, the build is for REMIX_SSR.
       *                               (Deployment (build) must be done in two parts.)
       * @param bindingsName {string} - The bind name set in toml. This name will be converted to a bind object.
       * @param enabled {boolean} - If this is false, this plugin is disabled.
       */
      remixServiceBindings(
        !IS_SSR,
        "REMIX_SSR",
        IS_WORKER_SPREAD
      ),
      ...option.plugins,
    ];
  }

  return option;
});

/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  serverBuildTarget: "cloudflare-workers",
  ignoredRouteFiles: [
    "**/.*",
    "**/*.css",
    "**/*.test.{js,jsx,ts,tsx}",
  ],
  server: "./server.ts",
  serverBuildPath: IS_SSR
    ? "build/ssr/index.js"
    : "build/remix/index.js",
  // devServerBroadcastDelay: 1000,
  // devServerPort: IS_SSR ? 8002 : 8003,
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // publicPath: "/build/",
};
