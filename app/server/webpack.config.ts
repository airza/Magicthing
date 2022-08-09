const path = require("path");
const nodeExternals = require('webpack-node-externals');
const DEV = process.env?.['NODE_ENV'] !== "production";
module.exports = {
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, '../build/'),
        filename: 'index.js',
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: ['ts-loader', 'source-map-loader'],
                exclude: /node_modules/,
            },
            {
                test: /\.pug$/,
                loader: '@webdiscus/pug-loader',
            },
        ],
    },
    externals: [nodeExternals()],
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    mode: DEV ? "development" : "production",
    target: "node",
    stats: 'errors-only',
    devtool: "eval-source-map",
    context: path.resolve(__dirname)
}
