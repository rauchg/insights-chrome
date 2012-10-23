/*global eio*/

var __socketids = 0;

eio.Socket.sockets.evs.on('add', function(socket){
  var id = socket.host + ':' + socket.port;

  socket.on('packet', function(data){
    window.postMessage({
      type: 'packet',
      data: data,
      id: id
    }, '*');
  });

  socket.on('packetCreate', function(data){
    window.postMessage({
      type: 'packetCreate',
      data: data,
      id: id
    }, '*');
  });

  socket.on('open', function(){
    window.postMessage({
      type: 'open',
      id: id
    }, '*');
  });

  socket.on('close', function(){
    window.postMessage({
      type: 'close',
      id: id
    }, '*');
  });
});
