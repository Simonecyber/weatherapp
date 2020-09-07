
const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv').config( {
    path: path.join(__dirname, '.env')
  } );

module.exports ={
    mode:'development',
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new webpack.DefinePlugin( {
          "process.env": dotenv.parsed
        } ),
      ],
};