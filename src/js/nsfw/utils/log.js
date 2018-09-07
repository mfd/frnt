export default function log ( prefix ) {
    return function ( ...message ) {
        console.log(`${prefix} ::`, ...message);
    };
};