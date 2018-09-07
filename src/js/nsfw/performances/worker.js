self.addEventListener('message', receiveMessage);

self.calculate = function(e, id) {
    var start = Date.now();
    var array = [];
    for (var i = 0; i < 20000; i++) {
      array[i] = Math.pow(Math.sin(Math.random()), 2);
    }
    array[i] = null;
    var end = Date.now();
    post({ time: end - start }, id);
}

function receiveMessage(e) {
  /*if (e.data.code) {
    self.eval(e.data.code);
    return;
  }*/

  //if (e.data.message.fn) {
    self[e.data.message.fn](e.data.message, e.data.id);
    //return;
  //}
}

function post(data, id, buffer) {
  if (!(data && id)) {
    id = data;
    data = null;
  }

  self.postMessage({
    post: true,
    id: id,
    message: data
  });
}
