/*global chrome*/

chrome.devtools.panels.create(
  "IO",
  "io.png",
  "io.html",
  onPanel
);

function onPanel(panel){
  var _window;
  var data = [];
  var port = chrome.extension.connect({ name: "_eio" });

  port.onMessage.addListener(function(msg) {
    if (_window) {
      _window.eioMessage(msg);
    } else {
      data.push(msg);
    }
  });

  panel.onShown.addListener(function tmp(panelWindow) {
    panel.onShown.removeListener(tmp);
    _window = panelWindow;

    var msg;
    while (msg = data.shift()) _window.eioMessage(msg);
  });
};
