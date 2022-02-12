import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import typescript from "@rollup/plugin-typescript";

import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        typescript({
            tsconfig: "./tsconfig.json",

            exclude: ["__tests__/*.ts", "tests/*.ts", "tests/**/*.ts"],
        }),
    ],
    build: {
        lib: {
            entry: path.resolve(__dirname, "src/build.ts"),
            name: "VueToastr",
            fileName: format => `vue-toastr.${format}.js`,
            formats: ["iife", "umd", "cjs", "es"],
        },
        rollupOptions: {
            // make sure to externalize deps that shouldn't be bundled
            // into your library
            external: ["vue"],
            output: {
                sourcemap: true,
                // Provide global variables to use in the UMD build
                // for externalized deps
                globals: {
                    vue: "Vue",
                },
            },
        },
    },
});
