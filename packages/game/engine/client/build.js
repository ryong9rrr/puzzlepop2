import build from "@puzzlepop2/esbuild-config";
import pkg from "./package.json" assert { type: "json" };

build({
  pkg,
});
