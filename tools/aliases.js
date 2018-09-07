import path from 'path';

const alias = {
    root: path.join(process.cwd(), '/src/js/custom'), // do not touch
    //root: path.join(process.cwd(), '/build'),
    nsfw: '/../nsfw',
    //b: '../../../build',
};
export default alias;