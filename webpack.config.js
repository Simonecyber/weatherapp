
const path = require('path');
const Dotenv = require('dotenv-webpack');


module.exports ={
    mode:'development',
    entry: './src/index.js',

    plugins: [
        new Dotenv(
            {
                path: './src/.env'
            }
        )
    ],


    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    },

    watch: true
};