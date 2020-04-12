/* eslint-disable */
const path = require("path");
const autoprefixer = require("autoprefixer");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const { ConfigurationManager } = require("@nivinjoseph/n-config");
const webpack = require("webpack");


const env = ConfigurationManager.getConfig("env");
console.log("WEBPACK ENV", env);

const isDev = env === "dev";

const moduleRules = [
    {
        test: /\.(scss|sass)$/,
        use: [{
            loader: isDev ? "style-loader" : MiniCssExtractPlugin.loader
        }, {
            loader: "css-loader" // translates CSS into CommonJS
        }, {
            loader: "postcss-loader", // postcss
            options: {
                plugins: () => ([
                    require("postcss-flexbugs-fixes"),
                    autoprefixer({
                        // browsers: [
                        //     ">1%",
                        //     "not ie < 9"
                        // ],
                        flexbox: "no-2009"
                    })
                ])
            }
        }, {
            loader: "sass-loader" // compiles Sass to CSS -> depends on node-sass
        }]
    },
    {
        test: /\.css$/,
        use: [{
            loader: isDev ? "style-loader" : MiniCssExtractPlugin.loader
        }, {
            loader: "css-loader" // translates CSS into CommonJS
        }]
    },
    {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        use: [
            {
                loader: "url-loader",
                options: {
                    limit: isDev ? 900000 : 90000,
                    fallback: "file-loader",
                    esModule: false
                }
            },
            {
                loader: "image-webpack-loader",
                options: {
                    disable: false, // webpack@2.x and newer
                },
            }
        ]
    },
    {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
            isDev ? "file-loader" : {
                loader: "url-loader",
                options: {
                    limit: 9000,
                    fallback: "file-loader"
                }
            }
        ]
    },
    // {
    //     test: /\.ts(x?)$/,
    //     exclude: /node_modules/,
    //     use: [
    //         {
    //             loader: 'babel-loader',
    //             options: {
    //                 presets: ['@babel/preset-env', "@babel/preset-react"],
    //                 plugins: isDev ? ["react-hot-loader/babel"] : []
    //                 // cacheDirectory: true,
    //                 // cacheCompression: false
    //             }
    //         },
    //         {
    //             loader: "ts-loader"
    //         }
    //     ]
    // },
    {
        test: /\.js(x?)$/,
        exclude: /node_modules/,
        use: [
            {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env', "@babel/preset-react"],
                    plugins: isDev ? ["react-hot-loader/babel"] : [],
                    cacheDirectory: true,
                    cacheCompression: false
                }
            }
        ]
    },
    {
        test: /\.taskworker\.js$/,
        use: [
            {
                loader: "worker-loader"
            }
            // {
            //     loader: "ts-loader"
            // }
        ]
    },
    {
        test: /\.html$/,
        // exclude: [path.resolve(__dirname, "src/server")],
        use: [
            {
                loader: "html-loader",
                options: {
                    // attrs: ["img:src", "use:xlink:href"],
                    attributes: {
                        list: [
                            {
                                tag: "img",
                                attribute: "src",
                                type: "src"
                            },
                            {
                                tag: "use",
                                attribute: "xlink:href",
                                type: "src"
                            }
                        ]
                    }
                }
            }
        ]
    }
];

const plugins = [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
        template: "src/index.html",
        filename: "index.html",
        favicon: "src/images/favicon.ico",
        hash: true
    }),
    new webpack.DefinePlugin({
        APP_CONFIG: JSON.stringify({
            foo: "fizz",
            bar: 1,
            baz: true
        })
    })
];

if (isDev) {
    moduleRules.push(
        {
            test: /\.js$/,
            loader: "source-map-loader",
            enforce: "pre"
        },
        // {
        //     test: /\.js$/,
        //     exclude: /node_modules/,
        //     use: {
        //         loader: 'babel-loader',
        //         options: {
        //             presets: ['@babel/preset-env', "@babel/preset-react"],
        //             plugins: ["react-hot-loader/babel"]
        //         }
        //     }
        // }
    );
}
else {
    // moduleRules.push({
    //     test: /\.js$/,
    //     use: {
    //         loader: "babel-loader",
    //         options: {
    //             presets: [["@babel/preset-env", {
    //                 debug: false,
    //                 targets: {
    //                     // browsers: ["> 1%", "Chrome >= 41"],
    //                     chrome: "41" // this is what googles web crawler uses
    //                 },
    //                 useBuiltIns: "entry",
    //                 forceAllTransforms: true,
    //                 modules: "commonjs"
    //             }]]
    //         }
    //     }
    // });

    plugins.push(...[
        new MiniCssExtractPlugin({
            filename: "client.bundle.css"
        }),
        new CompressionPlugin({
            test: /\.(js|css|svg)$/
        })
    ]);
}

let devServer;
if (isDev)
{
    devServer = {
        contentBase: path.join(__dirname, "src/dist"),
        compress: false,
        port: 9000,
        hot: true
    };
}

module.exports = {
    mode: isDev ? "development" : "production",
    target: "web",
    // entry: ["./src/index.tsx"],
    entry: ["./src/index.js"],
    output: {
        filename: "client.bundle.js",
        chunkFilename: "[name].bundle.js",
        path: path.resolve(__dirname, "src/dist"),
        publicPath: "/"
    },
    devtool: isDev ? "source-map" : false,
    devServer,
    optimization: {
        splitChunks: {
            chunks: "all"
        },
        minimizer: [
            new UglifyJsPlugin({
                sourceMap: false,
                uglifyOptions: {
                    keep_classnames: true,
                    keep_fnames: true,
                    safari10: true,
                    output: {
                        comments: false
                    }
                }
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    },
    module: {
        rules: moduleRules
    },
    plugins: plugins,
    resolve: {
        // extensions: ['.wasm', '.mjs', '.js', '.json', ".ts", ".tsx"],
        alias: {
            // https://feathericons.com/
            feather: path.resolve(__dirname, "node_modules/feather-icons/dist/feather-sprite.svg")
        }
    }
};