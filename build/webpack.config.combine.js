var vue = require('vue-loader')
var webpack = require('webpack')
module.exports = {
    entry: './src/main.js',
    name: 'vueToastr',
    output: {
        path: './dist',
        publicPath: '/dist/',
        filename: 'vue-toastr.js',
        library: ["vueToastr"],
        libraryTarget: "umd"
    },
    module: {
        loaders: [{
            test: /\.less$/,
            loader: "style!css!less",
        }, {
            test: /\.vue$/,
            loader: 'vue'
        }, {
            test: /\.html$/,
            loader: "vue-html"
        }, {
            test: /\.js$/,
            exclude: /node_modules|\/dist/,
            loader: 'babel'
        }]
    },
    babel: {
        presets: ['es2015'],
        plugins: ['transform-runtime', 'lodash', 'add-module-exports']
    }
}
module.exports.output.filename = module.exports.output.filename.replace(/\.js$/, '.combine.min.js');
module.exports.plugins = [
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: '"production"'
        }
    }),
    new webpack.optimize.UglifyJsPlugin({
        sourceMap: false,
        compress: {
            warnings: false
        }
    }),
    new webpack.optimize.OccurenceOrderPlugin()
]