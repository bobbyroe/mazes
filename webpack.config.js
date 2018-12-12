const path = require('path');

module.exports = {
    mode: 'development', // development, production or none
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    }
};