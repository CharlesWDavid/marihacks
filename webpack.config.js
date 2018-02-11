var config = {
   entry: './app.js',
   output: {
      path:'/',
      filename: 'index.js',
   },
   devServer: {
      historyApiFallback: true,
      inline: true,
      port: 8080
   },
   module: {
      loaders: [
         {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
         }
      ]
   }
}
module.exports = config;