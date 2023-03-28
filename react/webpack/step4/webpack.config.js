const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './src/index.js',
    resolve: {
        extensions: ['.js'],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            filename: 'index.html',
        }),
    ],
    // module: {
    //     roule: [
    //         {
    //             test: /\.jsx?$/,
    //             exclude: /node_modules/,
    //             use: {
    //                 loader: 'babel-loader',
    //             },
    //         },
    //     ],
    // },
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist'),
    },
}
