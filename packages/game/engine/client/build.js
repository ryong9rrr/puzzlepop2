import build from "@puzzlepop2/esbuild-config";
import pkg from "./package.json" assert { type: "json" };

const config = {
  banner: {
    js: `"use client";`,
  },
};

build({
  pkg,
  config,
});
