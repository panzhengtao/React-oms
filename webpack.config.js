const webpack = require('webpack');
const path = require('path');
const config = require('./config');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');//清除编译文件
const NODE_ENV = process.env.NODE_ENV || 'development'
const BUILD_PATH = 'dist';




const vendors = [
    'babel-polyfill', //ie9以及以上浏览量中支持promise等异步流程处理API
    'react',
    'react-dom',
    'react-redux',
    'redux',
    'redux-thunk',
    'axios',
    'lodash',
];

const __DEV__ = NODE_ENV === 'development';
const __PROD__ = NODE_ENV === 'production';
const conftilte = config.title;
const confName = config.globalName;
const extractCSS = new ExtractTextPlugin("statics/css/[name].[chunkhash:7].css");


const webpackConfig = {
    entry: {
        index: './src/common/index.js',
    },
    resolve: {
        modules: [path.resolve(__dirname, 'node_modules')],
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        filename: 'statics/js/[name].[chunkhash:7].js',
        chunkFilename: 'statics/js/[name].[chunkhash:7].chunk.js',
    },
    devServer: {
        compress: true,
        inline: true,
        port: 8282,
        historyApiFallback: true,
        proxy: {
            '/mockjsdata/3': {
                target: 'http://192.168.201.211:9090'//测试环境IP
            },
            '/api/oms': {
                target: 'http://192.168.201.212:8080'//测试环境IP
            },
            '/api/grab': {
                target: 'http://192.168.201.27'//后台IP
            }
        }
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                include: [
                    path.resolve(__dirname, "src")
                ],
                use: [{
                    loader: 'babel-loader?cacheDirectory=true'
                }]
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({fallback: "style-loader", use: "css-loader"})
            },
            {
                test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)$/,
                // 图片加载器，较小的图片转成base64
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: 'statics/images/[name].[hash:7].[ext]'
                }
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            title: confName,
            filename: './index.html',
            template: './src/index.html',
            inject: true,
            chunks: ['commons', 'vendors','index',],
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            },
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['commons','vendors'], // 公共模块的名称{
            minChunks: 2
        }),
        extractCSS,

    ],
}

//生产环境
if (__PROD__) {
    webpackConfig.stats = {
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false,
        assets: false
    },
        webpackConfig.plugins = webpackConfig.plugins.concat([
            new CleanWebpackPlugin([BUILD_PATH],
                {
                    root: __dirname,
                    verbose: true,
                    dry: false
                }),
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: '"production"'
                }
            }),
            new webpack.optimize.UglifyJsPlugin({
                // 最紧凑的输出
                beautify: false,
                // 删除所有的注释
                comments: false,
                compress: {
                    // 在UglifyJs删除没有用到的代码时不输出警告
                    warnings: false,
                    // 删除所有的 `console` 语句
                    // 还可以兼容ie浏览器
                    drop_console: true,
                    // 内嵌定义了但是只用到一次的变量
                    collapse_vars: true,
                    // 提取出出现多次但是没有定义成变量去引用的静态值
                    reduce_vars: true,
                }
            }),
            new webpack.LoaderOptionsPlugin({
                minimize: true,
                debug: false,
            }),
            new webpack.optimize.OccurrenceOrderPlugin(true)
        ]);
}

webpackConfig.entry['vendors'] = vendors; //公共文件单独注册一个vendors的入口文件

module.exports = webpackConfig;