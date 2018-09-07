/**
 * Returns an object of parameters set in the current url
 * 
 * @return Object
 */
export function getParams() {
    const queryString = {};
    const query = window.location.search.substring(1);
    const vars = query.split("&");

    for (let i=0;i<vars.length;i++) {
      const pair = vars[i].split("=");

      if (typeof queryString[pair[0]] === "undefined") {
          queryString[pair[0]] = pair[1];

      } else if (typeof queryString[pair[0]] === "string") {
          const arr = [ queryString[pair[0]], pair[1] ];
          queryString[pair[0]] = arr;

      } else {
          queryString[pair[0]].push(pair[1]);
      }
    }

    return queryString;
}