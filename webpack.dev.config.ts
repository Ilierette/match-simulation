import path from "path";
import { Configuration as WebpackConfiguration, HotModuleReplacementPlugin } from "webpack";
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server';
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration;
}

const config: Configuration = {
  mode: "development",
  output: {
    publicPath: "/",
  },
  entry: "/src/app.tsx",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              logInfoToStdOut: true,
              logLevel: 'info'
            }
          }
        ]
      },
      {
        test: /\.(css|scss)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: "css-loader", options: {
              sourceMap: true
            },
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "autoprefixer",
                    {
                      grid: "autoplace",
                      remove: false
                    },
                  ],
                ],
              },
            },
          },
          {
            loader: "sass-loader", options: {
              sourceMap: true
            }
          }]
      },
      {
        test: /\.(png|jpg|gif|woff|woff2|eot|ttf|svg|pdf)$/,
        type: 'asset/resource',
        generator: {
          filename: 'content/[name].[hash][ext]'
        }
      },
      {
        test: /\.m?js$/,
        //exclude: /node_modules/,
        include: [
          path.resolve(__dirname, "node_modules/yup"),
          path.resolve(__dirname, "node_modules/react-router"),
          path.resolve(__dirname, "node_modules/react-hook-form")
        ],
        use: [{
          loader: "babel-loader", options: {
            cacheDirectory: true,
            presets: ['@babel/preset-env']
          },
        }]
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
    modules: [path.resolve(__dirname, 'src'), 'node_modules']
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/public/index.html',
    }),
    new HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin()
  ],
  devtool: "inline-source-map",
  devServer: {
    static: path.join(__dirname, "build"),
    historyApiFallback: true,
    port: 5000,
    open: true,
    hot: true
  },
};

export default config;