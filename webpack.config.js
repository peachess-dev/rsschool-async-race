const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const glob = require("glob");

module.exports = {
  mode: "production",
  entry: {
    bundle: path.resolve(__dirname, "./app.js"),
    style: glob.sync("./src/assets/style/*.css"),
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js",
    clean: true,
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, "dist"),
    },
    noInfo: true,
    port: 3300,
    open: true,
    compress: true,
  },
  watchOptions: {
    aggregateTimeout: 200,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/,
        type: "asset/resource",
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Peachess' Async Race",
      template: "index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "style.bundle.css",
    }),
  ],
};
