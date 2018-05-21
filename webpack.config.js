const path = require('path')

module.exports = {
    mode: 'development',
    target: 'node',

    entry: './src/app.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'alarm.js',
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                },
            }
        ],
    },
}
