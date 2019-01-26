const path = require('path')

module.exports = {
  entry: './examples/src/index.js',
  output: {
    path: path.join(__dirname, "examples/dist"),
    filename: "main.js"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
            }
          },
        ]
      },
      {
        test: /\.[s]?css$/,
        use: [ 'style-loader', 'css-loader', 'sass-loader']
      },
    ]
  },
  devServer: {
    port: 1998,
    contentBase: './example/src'
  }
}
