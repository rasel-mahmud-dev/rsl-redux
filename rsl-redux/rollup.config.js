import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import postcss from "rollup-plugin-postcss";
// import copy from "rollup-plugin-copy";
import terser from "@rollup/plugin-terser";

export default {
    input: [
        "src/index.js",
        "src/configureStore.ts",
        "src/createSlice.ts",
        "src/useSelector.ts",
        "src/createAsyncAction.ts",
        "src/useDispatch.ts",
        "src/createApi.ts"
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
        typescript({ useTsconfigDeclarationDir: true }),
        postcss({
            extract: true, // Extract CSS to a separate file
            minimize: true,
            extensions: ['.css', '.scss'],
            inject: false
        }),
        // terser(),
        // copy({
        //     targets: [
        //         {
        //             src: "build/index.css",
        //             dest: "build",
        //             rename: "index.css"
        //         }
        //     ]
        // })
    ]
};