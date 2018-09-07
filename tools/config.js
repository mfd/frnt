//const pjson = require('./package.json');
const srcDir = './src';
//const outputDir = './'; // for wordpress, replace it by './'
const outputDir = './build'; // for wordpress, replace it by './'

const {description, author} = require('../package.json');
const bntext = (() => {
  var dt = new Date();
  var date = `${dt.getDate()}/`+("0" + (dt.getMonth() + 1)).slice(-2)+`/${dt.getFullYear()}`;
  return (`${description}, ${author} — ${date}`);
})();

const config = {
  styles: {
    // browserSupport: ['last 2 versions'],
    browserSupport: [
      'ie >= 9',
      'Firefox >= 38',
      'Chrome >= 44',
      'ChromeAndroid >= 44',
      'Safari >= 8',
      'Edge >= 0',
      'iOS >= 8'
    ],
    entry: `${srcDir}/sass/main.scss`,
    watch: `${srcDir}/sass/**/*.scss`,
    directory: `${srcDir}/sass/`,
    output: {
      path: `${outputDir}/css/`,
      filename: 'build'
    }
  },
  scripts: {
    custom: {
      entry: `${srcDir}/js/custom/Main.js`,
      output: {
        path: `${outputDir}/js`,
        filename: `build`
      },
    },
    vendors: {
      directory: `${srcDir}/js/vendors/`,
      entries: [
        `${srcDir}/js/vendors/**/*.js`
      ],
      output: {
        path: `${outputDir}/js/`,
        filename: `vendors`
      },
      watch: `${srcDir}/js/vendors/**/*.js`
    },
    envs: ['NODE_ENV'],
    banner: `/* ${bntext}', 'color:#fff; background-color:#000; padding:5px 10px; font-size:9px;');`,
    quiet: true,
  }
};

export default config;