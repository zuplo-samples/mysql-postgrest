import type { NextConfig } from "next";
import CopyPlugin from "copy-webpack-plugin";
import path from "path";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.plugins.push(
      new CopyPlugin({
        patterns: [
          // error is triggered during the build if the file is not there (but not actually used from here)
          {
            from: "node_modules/@subzerocloud/rest/subzero_wasm_bg.wasm",
            to: "server/app/api/[...query]/subzero_wasm_bg.wasm",
          },
          // this is used on runtime
          {
            from: "node_modules/@subzerocloud/rest/subzero_wasm_bg.wasm",
            to: "server/vendor-chunks/subzero_wasm_bg.wasm",
          },
          // error is triggered during the build if the file is not there (but not actually used from here)
          {
            from: "node_modules/@subzerocloud/rest/subzero_wasm_bg.wasm",
            to: "server/src/app/api/[...query]/subzero_wasm_bg.wasm",
          },
          {
            from: "node_modules/@subzerocloud/rest/subzero_wasm_bg.wasm",
            to: ".next/server/chunks/subzero_wasm_bg.wasm",
          },
        ],
      })
    );

    return config;
  },
  outputFileTracingRoot: path.join(__dirname),
  outputFileTracingIncludes: {
    "/api/**/*": ["./node_modules/**/*.wasm"],
    "/src/api/**/*": ["./node_modules/**/*.wasm"],
    "/src/app/api/**/*": ["./node_modules/**/*.wasm"],
    "/app/api/**/*": ["./node_modules/**/*.wasm"],
  },
  serverExternalPackages: ["@subzerocloud/rest"],
};

export default nextConfig;
