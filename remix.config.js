 /** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  appDirectory: "app",
  assetsBuildDirectory: "public/build",
  publicPath: "/build/",
  serverModuleFormat: "esm",
  serverPlatform: "neutral",
  serverBuildDirectory: "build",
  devServerBroadcastDelay: 1000,
  ignoredRouteFiles: [".*"],
  tailwind: true,
  postcss: true,

};
