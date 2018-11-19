const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const TransferWebpackPlugin = require('transfer-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const precss = require('precss');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')


module.exports = {
  entry: [
    './src/index.js',
  ],
  output: {
    filename: '[name].bundle.min.js',
    chunkFilename: '[name].bundle.min.js',
    path: path.resolve(__dirname, 'dist'),
  },
  optimization: {
     splitChunks: {
       chunks: 'all'
     }
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new ExtractTextPlugin('bundle.min.css'),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template:'src/index.html'
    }),
    new HtmlWebpackPlugin({
      filename: 'about.html',
      template:'src/about.html'
    }),
     new WorkboxPlugin.GenerateSW({
     clientsClaim: true,
     skipWaiting: true
   }),
    new CopyWebpackPlugin([{ from: 'src/assets/images/icons', to: 'assets/images/icons' }]),
    new CopyWebpackPlugin([{ from: 'src/manifest.json', to: 'manifest.json',toType: 'file' }]),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
  ],
  module: {
     rules: [
       {
         test: /\.css$/,
         use: ExtractTextPlugin.extract({fallback: 'style-loader', use: 'css-loader'}),  
       },
        {
        test: /\.(png|jpg|jpe?g|gif|svg)$/,
        use: [{
                loader: 'file-loader',
                options: {
                  name: '[name].[ext]',
                  outputPath : 'assets/images/',
                  publicPath : 'assets/images/',
                }
             },
             {
               loader: 'image-webpack-loader',
             }]
      },
       {
        test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: 'url-loader?limit=10000',
      },
       {
         test: /\.(woff|woff2|eot|ttf|otf|svg)(\?[\s\S]+)$/,
         use: [{
           loader: 'file-loader',
           options: {
              name: '[name].[ext]',
              outputPath : 'assets/fonts/',
              publicPath : 'assets/fonts/',
            }
         }]
       },
      {
        test: /\.(scss)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader', // translates CSS into CommonJS modules
            }, {
              loader: 'postcss-loader', // Run post css actions
              options: {
                plugins() {
                  // post css plugins, can be exported to postcss.config.js
                  return [
                    precss,
                    autoprefixer
                  ];
                }
              }
            }, {
              loader: 'sass-loader' // compiles SASS to CSS
            }
          ]
        })
      },{
        test: /\.jsx?$/,
        include : path.resolve(__dirname, 'src/assets/js'),
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-object-rest-spread']
          }
        }
      },
      {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader',
        }
      }
     ]
   }
};