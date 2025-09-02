import build from "@puzzlepop2/esbuild-config";

import { createRequire } from "module";
const require = createRequire(import.meta.url);
const pkg = require("./package.json");

build({
  pkg,
});
