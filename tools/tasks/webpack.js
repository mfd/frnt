import log from 'fancy-log';
import webpack from 'webpack';
import path from 'path';
import chalk from 'chalk';
import glob from 'glob';

import formatStats from '../utils/formatStats';
import notify from '../utils/notify';
import prettifyTime from '../utils/prettifyTime';
import webpackConfig from '../utils/webpack.config';
import config from '../config';

// import 'babel-polyfill';
// import 'whatwg-fetch';


const icon = path.join(process.cwd(), 'tools/utils/icon-js.png');
const isProduction = require('../utils/isProduction').default();
const suffix = isProduction ? '.min' : '';
const filename = `${config.scripts.custom.output.filename}${suffix}.js`;



// function fetchPkg() {
// return fetch('./package.json')
//   .then(response => response.json())
//   .then(pkg => window.PKG = pkg);
// }




function onCompile ( error, stats ) {
    const messages = formatStats(stats.toJson({}, true));
    const isSuccessful = !messages.errors.length && !messages.warnings.length;
    const time = prettifyTime(stats.endTime - stats.startTime);

    if ( messages.errors.length ) {
        log(chalk.red('JS: Failed to compile.'));
        console.log();
        messages.errors.forEach(message => {
            notify('JS: Failed to compile.', message, {
                icon: icon,
                sound: 'Frog', // case sensitive
            });
            console.log(message);
            console.log();
        });
        return;
    }

    if ( messages.warnings.length ) {
        const message = `Compiled with warnings in ${time}.`;
        log(chalk.yellow(`JS: ${message}`));
        console.log();
        messages.warnings.forEach(message => {
            console.log(message);
            console.log();
        });

        notify('JS', message, {
            icon: icon,
        });
    }

    if ( isSuccessful ) {
        const message = `Compiled successfully in ${time}.`;

        !config.scripts.quiet && notify('JS', message, {
            icon: icon,
        });

        log(chalk.green(`JS: ${message}`), chalk.white(`[ ${filename} ]`));
    };
}

function beforeCompile () {
    log(chalk.yellow(`JS: Compiling...`));
}

beforeCompile();

const env = process.env.NODE_ENV || 'development';
const { compiler } = webpack(webpackConfig(env), onCompile);

if ( !isProduction ) {
    compiler.plugin('compile', beforeCompile);
}
