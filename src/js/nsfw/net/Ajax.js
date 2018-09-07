/**
 * Ajax Request
 * Basic sending/posting
 */

class Ajax {

    static load(url, callback = null, method = 'GET', params = null) {

        const request = new XMLHttpRequest();

        request.onreadystatechange = ()=> {

            if (request.readyState === 4 && callback) callback( request ); 
        };

        // security check IE
        if(window.isIE) url += '?d=' + Date.now();

        // request
        request.open(method, url);

        if( method === 'POST' )
        	request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        else
        	request.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

        request.send(params); 
    }

}

export default Ajax;