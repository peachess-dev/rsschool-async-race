const path = require("path");

module.exports = {
  entry: "./app.js",
  mode: "development",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  watch: true,
  watchOptions: {
    aggregateTimeout: 200,
  },
};
