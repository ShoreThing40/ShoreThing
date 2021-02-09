const path = require('path');

module.exports = {
  entry: './client/index.jsx',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js',
  },
  mode: process.env.NODE_ENV,
  devServer: {
    publicPath: '/build/',
    proxy: {
      // CHANGE WHEN NEEDED
      '/api': 'http://localhost:3000/',
      '/orderlist': 'http://localhost:3000/',
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.s?css/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
        },
      },
      
      // {
      //   test: /\.s?css/,
      //   exclude: /node_modules/,
      //   use: [{
      //     loader: 'style-loader',
      //   }, {
      //     loader: 'css-loader',
      //   },
      //   {
      //     loader: 'postcss-loader',
      //     options: {
      //       postcssOptions: {
      //         // postcss plugins, can be exported to postcss.config.js
      //         plugins: function () {
      //           return [
      //             require('autoprefixer')
      //           ];
      //         }
      //       },
      //     },
      //   },
      //   {
      //     loader: 'sass-loader',
      //   }],
      // },
    ],
  },
};
