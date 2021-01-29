const path = require('path');

const paths = {
    entry: path.resolve(__dirname, 'src/index.jsx'),
    out: path.resolve(__dirname, 'dist/js')
};

module.exports = {
    mode: 'development',
    entry: paths.entry,
    output: {
        path: paths.out,
        filename: 'bundle.js'
    },
    devtool: "source-map",
    devServer: {
        contentBase: path.join(__dirname, '/'),
        compress: true,
        port: 9000,
        open: true,
        hot: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.jsx$/,
                exclude: /(node_modules)/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            modules: true
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: ["file-loader"]
            },
            {
                test: /\.json$/,
                use: ['json-loader']
            }
        ]
    }
}