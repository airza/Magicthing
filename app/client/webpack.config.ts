const path = require("path");
const DEV = process.env?.['NODE_ENV'] !== "production";
const copyPlugin = require("copy-webpack-plugin");
module.exports = {
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, '../build/static/'),
        filename: 'index.js',
        asyncChunks: false,
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: ['ts-loader',],
                exclude: /node_modules/,
            },
        ],
    },
    plugins: [
        new copyPlugin({
            patterns: [
                { from: "../static",to: "../../static" },
            ],
        }),
    ],
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    mode:"development",
    context:path.resolve(__dirname),
    optimization: {
        minimize: false
    },
    devtool:false,
    stats: 'errors-only',
};