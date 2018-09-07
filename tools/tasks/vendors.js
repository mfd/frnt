import glob from 'glob';
import fs from 'fs-extra';
import log from 'fancy-log';
import chalk from 'chalk';
import path from 'path';
import { watch } from 'chokidar';

const isProduction = require('../utils/isProduction').default();
const { output, entries, directory } = require('../config').default.scripts.vendors;
const suffix = isProduction ? '.min' : '';
const filename = `${output.filename}${suffix}.js`;
const outFile = `${output.path}${filename}`;

const concatenate = () => {
    const vendors = new Set();

    const items = entries.length ? entries : ( entries[process.env.NODE_ENV] ? entries[process.env.NODE_ENV] : [] );


    if ( items.length === 0 ) {
        log(chalk.red(`JS: Vendors entries are empty.`));
        return;
    }

    const matches = [];
    const negativeMatches = [];

    for ( let i = 0; i < items.length; i++ ) {
        if ( items[i].substr(0, 1) === '!' ) {
           const item = items[i].split('!')[1];

           negativeMatches.push(item);
        }

        const files = glob.sync(items[i]);

        for ( let j = 0; j < files.length; j++ ) {
            matches.push(files[j]);
        }
    }

    const filteredMatches = matches.filter( ( match ) => {
        return negativeMatches.indexOf(match) < 0;
    });

    for ( let i = 0; i < filteredMatches.length; i++ ) {
        vendors.add(path.resolve(filteredMatches[i]));
    }

    const fileContents = Array.from(vendors).map( filePath => fs.readFile(filePath));

    Promise.all(fileContents).then( files => {
        //const output = files.map((f,index) => f.toString()).join(`\n /* ###* */ \n`);
        //const aNames = filteredMatches.map(f => f.split('/').pop());
        const aNames = filteredMatches.map(f => f);
        const aSrc = files.map(f => f.toString());
        const output = aNames.map((item, index) => `/* => ${item} */\n${aSrc[index]}`).join(`\n`);
        return fs.outputFile(outFile, output);
    }).then( () => {
        log(chalk.green('JS: Vendors concatenaded successfully.', chalk.white(`[ ${filename}] `)));
    }).catch( ( error ) => {
        log(chalk.red(error));
    })
};

if ( !isProduction ) {
    const watcher = watch(path.resolve(directory), {
        ignored: /[\/\\]\./, persistent: true
    })
    watcher.on('ready', () => {
        watcher.on('add', concatenate);
        concatenate()
    });
    watcher.on('change', concatenate);
    watcher.on('unlink', concatenate);
} else {
    concatenate();
}