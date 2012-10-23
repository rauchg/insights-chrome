/*global chrome*/

var _port;
var data = [];

chrome.extension.onConnect.addListener(function(port){
  if (port.name !== "_eio") return;
  var msg;
  while (msg = data.shift()) port.postMessage(msg);
  _port = port;
});

chrome.extension.onMessage.addListener(function(e){
  if (e._eio) {
    if (_port) {
      _port.postMessage(e.data);
    } else {
      data.push(e.data);
    }
  }
});
