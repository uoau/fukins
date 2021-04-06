
const path = require('path');
const glob = require('glob');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const setMPA = (env)=>{
    const entry = {};
    const htmlWebpackPlugins = [];
    const entryFiles = glob.sync(path.join(__dirname,'../pages/*/index.js'))
    entryFiles.map((item)=>{
        const match = item.match(/pages\/(.*)\/index.js$/);
        const pageName = match && match[1];
        entry[pageName] = item;
        htmlWebpackPlugins.push(
            new HtmlWebpackPlugin({
                template : path.join(__dirname,`../pages/${ pageName }/index${ env === 'production'?'.prod':'' }.html`),
                filename : `${pageName}.html`,
                chunks: [pageName],
                publicPath:  env === 'production'?'//cdn.955ui.com':'',
            })
        )
    })
    return {
        entry,
        htmlWebpackPlugins
    }
}

module.exports = {
    entry: {
        'index': path.join(__dirname, '../src/index.js'),
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    preserveWhitespace: false,
                },
            },
            {
                test: /\.html$/,
                loader: 'html-loader',
                options: {
                    minimize: false,
                }
            },
            {
                test: /\.(le|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'less-loader',
                ],
            },
            {
                test:/\.(png|jpg|jpeg|gif)$/,
                use:[
                    {
                        loader:"url-loader",
                        options:{
                            limit:5000,
                        }
                    }
                ]
            },
            {
                test: /\.otf|ttf|woff2?|eot(\?\S*)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: '[name][hash:5].min.[ext]',
                            limit: 5000,
                            publicPath: '/fonts',
                            outputPath: '/fonts',
                            useRelativePath: true,
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template : path.join(__dirname, '../src/index.html'),
            filename : `index.html`,
        }),
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].[hash:8].css',
        })
    ],
    resolve: {
        alias: {
            vue$: 'vue/dist/vue.esm.js',
            '@components': path.join(__dirname, '../src/components'),
            '@': path.join(__dirname, '../src/'),
        },
        extensions: ['.js', '.vue', '.json'],
    },
};
