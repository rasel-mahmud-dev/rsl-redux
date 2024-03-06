import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import terser from "@rollup/plugin-terser";

export default {
    input: [
        "src/index.js",
        "src/configureStore.js",
        "src/createSlice.js",
        "src/useSelector.js",
        "src/createAsyncAction.js",
        "src/useDispatch.js",
        "src/createApi.js"
    ],
    output: [
        {
            dir: "dist",
            format: "cjs",
            sourcemap: true
        },
        {
            dir: "dist/esm",
            format: "esm",
            sourcemap: true
        },
    ],
    preserveModules: true,
    plugins: [
        peerDepsExternal(),
        resolve({
            browser: true
        }),
        commonjs(),
        terser(),
    ]
};