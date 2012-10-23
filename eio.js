/*global chrome*/

window.addEventListener("message", function(e){
  chrome.extension.sendMessage({
    _eio: true,
    data: e.data
  });
});
