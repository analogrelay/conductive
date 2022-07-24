import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";
import pkg from "./package.json";

const extensions = [".js", ".jsx", ".ts", ".tsx"];

export default [
  // browser-friendly UMD build
  {
    input: "src/index.ts",
    output: [
      {
        name: "conductive",
        file: pkg.browser,
        format: "umd",
        sourcemap: true,
      },

      // To make running it easier, we also push the build to the sample app.
      {
        name: "conductive",
        file: "../../samples/Conductive.Samples/wwwroot/dist/conductive.js",
        format: "umd",
        sourcemap: true,
      },
    ],
    plugins: [
      resolve({ extensions }),
      commonjs(),
      babel({
        extensions,
        babelHelpers: "bundled",
        include: ["src/**/*"],
        sourceMaps: true,
      }),
    ],
  },
];
