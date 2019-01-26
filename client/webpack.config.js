module.exports = {
  entry: ["babel-polyfill", "./src/index.js"],
  output: {
    path: __dirname + "/dist/",
    filename: "bundle.js",
    
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["env", "stage-0", "react", "flow"]
          }
        }
      }
    ]
  },
  mode: "development"
};
