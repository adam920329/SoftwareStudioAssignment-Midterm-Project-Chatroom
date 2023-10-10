var webpack = require('webpack');

module.exports = {

    entry: ['./index.js'],
    output: {
        filename: 'compiled.js',
        publicPath: '/'
    },
    resolve: {
        extensions: ['.js']
    },
    module: {
        rules: [{
                test: /\.(js)$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: ['@babel/preset-react', '@babel/preset-env']
                },
            }
        ]

    },
    plugins: [
        //new webpack.HotModuleReplacementPlugin(),
        new webpack.ProvidePlugin({
            React: 'react',
            ReactDOM: 'react-dom'
        })],
    mode: 'development',
    devServer: {
        static: './',
        hot: true,
        compress: true,
        host: 'localhost',
        port: 8080
    }

};
