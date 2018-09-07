import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin';
import path from 'path';
import webpack from 'webpack';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';

import aliases from '../aliases';
import config from '../config';

const isProduction = require('./isProduction').default();

// allow specification of root only once in the alias file
function createAlias () {
    if ( !aliases['root'] ) {
        throw new Error('Alias need a root key in order to work.')
    }

    const alias = {};

    Object.keys(aliases).map( ( key ) => {
        alias[key] = path.join(aliases['root'], aliases[key]);
    });
    //console.log(alias);
    return alias;
}

function webpackConfig ( env ) {
    const suffix = isProduction ? '.min.js' : '.js';
    const filename = `${config.scripts.custom.output.filename}${suffix}`;

    const options = {
        entry: path.join(process.cwd(), config.scripts.custom.entry),
        resolve: {
            alias: createAlias(),
        },
        target: 'web',
        context: path.join(process.cwd(), config.scripts.custom.output.path),
        output: {
            path: path.join(process.cwd(), config.scripts.custom.output.path),
            pathinfo: false,
            filename: filename,
        },
        module: {
            loaders: [
                {
                    test: /\.(js)$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                }, {
                    test: /\.(glsl|fs|vs)$/,
                    loader: 'webpack-glsl-loader'
                }
            ]
        },
        plugins: [
            new webpack.BannerPlugin({
                banner: config.scripts.banner,
                raw: true,
            }),
            new CaseSensitivePathsPlugin(),
            new webpack.EnvironmentPlugin(config.scripts.envs),
        ],
    };

    if ( !isProduction ) {
        options.devtool = 'inline-source-map';
        options.watch = true;
        options.watchOptions = {
            ignored: /node_modules/
        };
    } else {
        options.plugins.push(
            new webpack.LoaderOptionsPlugin({
                minimize: true,
                debug: true
            }),
            new webpack.optimize.UglifyJsPlugin(),
            new webpack.NoEmitOnErrorsPlugin(),
        );
    }

    return options;
}

export default webpackConfig;