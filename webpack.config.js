module.exports = {
  entry: './examples/index.js',
  mode: 'development',
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
    port: 1998
  }
}
