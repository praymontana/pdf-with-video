let webpack = require('webpack'); // eslint-disable-line no-unused-vars
let path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    context: __dirname,
    entry: {
        'pdf-worker': './node_modules/pdfjs-dist/build/pdf.worker.js',
        'lecture-viewer': './src/lecture-viewer/lecture-viewer.js',
    },
    mode: 'none',
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: './dist',
        filename: '[name].js'
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                {from: './src/lecture-viewer/lecture-viewer.html', to: '.'},
                {from: './node_modules/pdfjs-dist/cmaps', to: './cmaps', toType: 'dir'}
            ]
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            // filename: '[name].css',
            // chunkFilename: '[id].css',
        })
    ],
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    // 'style-loader',
                    MiniCssExtractPlugin.loader,
                    // Translates CSS into CommonJS
                    {
                        loader: 'css-loader',
                        options: {
                            url: false,
                        },
                    },
                    // Compiles Sass to CSS
                    'sass-loader',
                ]
            }
        ]
    }
};
