const merge = require('webpack-merge');
const path = require('path');

const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

let base_config = {
    context: __dirname,
    entry: {
        'pdf-worker': './node_modules/pdfjs-dist/build/pdf.worker.js',
        'lecture-viewer': './src/lecture-viewer/ts/lecture-notes-and-video-viewer.ts',
    },
    mode: 'none',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js'
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                {from: './src/lecture-viewer/lecture-viewer.html', to: '.'},
                {from: './node_modules/pdfjs-dist/cmaps', to: './pdfjs/cmaps', toType: 'dir'},
                {from: './node_modules/pdfjs-dist/web/images', to: './pdfjs/images', toType: 'dir'}
            ]
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            // filename: '[name].css',
            // chunkFilename: '[id].css',
            path: 'pdf'
        })
    ],
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    /*{
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: 'ASDF'
                        },
                    },*/
                    // Translates CSS into CommonJS
                    {
                        loader: 'css-loader',
                        options: {
                            url: false,
                        },
                    },
                    {
                        loader: path.resolve('pdfjs-css-loader.js'),
                        options: {
                            url_transform: (url) => 'pdfjs/' + url
                        }
                    },
                    'sass-loader'
                ]
            },
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js'],
    }
};

let prod_configuration = {
    mode: 'production',
    optimization: {
        minimizer: [
            new TerserPlugin({
                cache: true,
                parallel: true
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    }
};

let debug_configuration = {
    mode: 'development',
    devtool: 'inline-source-map'
};

module.exports = env => {
    let config;
    if (env && env.mode === 'prod')
        config = merge(base_config, prod_configuration);
    else
        config = merge(base_config, debug_configuration);

    console.log('config', config);
    return config;
};
