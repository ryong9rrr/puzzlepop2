import { vanillaExtractPlugin } from "@vanilla-extract/esbuild-plugin";
import build from "@puzzlepop2/esbuild-config";
import pkg from "./package.json" assert { type: "json" };

const config = {
  plugins: [vanillaExtractPlugin()],
};

build({
  pkg,
  config,
});
