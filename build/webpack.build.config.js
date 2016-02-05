var webpack = require("webpack");
var version = require("../package.json").version;
var banner =
    "/**\n" +
    " * vue-async-data v" + version + "\n" +
    " * https://github.com/vuejs/vue-async-data\n" +
    " * Released under the MIT License.\n" +
    " */\n";

module.exports = [

    {
        entry: "./src/vue-async-data",
        output: {
            path: "./dist",
            filename: "vue-async-data.js",
            library: "VueAsyncData",
            libraryTarget: "umd"
        },
        plugins: [
            new webpack.BannerPlugin(banner, {raw: true})
        ]
    },

    {
        entry: "./src/vue-async-data",
        output: {
            path: "./dist",
            filename: "vue-async-data.min.js",
            library: "VueAsyncData",
            libraryTarget: "umd"
        },
        plugins: [
            new webpack.optimize.UglifyJsPlugin,
            new webpack.BannerPlugin(banner, {raw: true})
        ]
    }

];
