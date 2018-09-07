import sass from 'node-sass';
import chalk from 'chalk';
import log from 'fancy-log';
import path from 'path';
import fs from 'fs-extra';
import CleanCSS from 'clean-css';
import postcss from 'postcss';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import tinylr from 'tiny-lr';
import { watch } from 'chokidar';

import notify from '../utils/notify';

const icon = path.join(process.cwd(), 'tools/utils/icon-sass.png');
const { entry, directory, browserSupport, output } = require('../config').default.styles;
const isProduction = require('../utils/isProduction').default();
const suffix = isProduction ? '.min' : '';
const minify = isProduction;

const filename = `${output.filename}${suffix}.css`;
const outFile = path.join(process.cwd(),`${output.path}${filename}`);
const lrport = 35729; // do not touch
const lr = tinylr();

const compile = () => {
    log(chalk.yellow(`CSS: Compiling...`));

    sass.render({
        file: entry,
        sourceMapEmbed: !isProduction,
        sourceMapContents: !isProduction,
        sourceMap: !isProduction,
    }, ( error, result ) => {
        if ( error ) {
            notify('CSS: Failed to compile.', error.message, {
                icon: icon,
                sound: 'Basso', // case sensitive
            });

            log(chalk.red(`CSS: Failed to compile.`));
            console.log(error.message);
            console.log(`in ${error.file} ${error.line}:${error.column}`);

            return;
        }

        postcss([
            autoprefixer({ browsers: browserSupport }),
            cssnano()
            ])
            .process(result.css.toString())
            .then( ({ css }) => {
                const output = minify ? new CleanCSS({}).minify(css).styles : css;

                return fs.outputFile(outFile, output);
            })
            .then( () => {
                const message = `CSS: Compiled successfully in ${result.stats.duration}ms.`;
                log(chalk.green(message), chalk.white(`[ ${filename} ]`));

                if ( !isProduction ) {
                    lr.changed({ body: { files: [ outFile ] } });
                }
            })
            .catch( ( err ) => {
                log(chalk.red(`CSS: Failed to compile`));
                throw err;
            });
    });
};

if ( !isProduction ) {
    const watcher = watch(path.resolve(directory), {
        ignored: /[\/\\]\./, persistent: true
    })
    watcher.on('ready', () => {
        watcher.on('add', compile);
        compile()
    });
    watcher.on('change', compile);
    watcher.on('unlink', compile);

    lr.listen(lrport, () => {
        log(chalk.yellow(`Livereload :: listening on ${lrport}`));
    });
} else{
    compile();
}