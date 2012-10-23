/*global SmoothieChart,TimeSeries*/

window.eioMessage = function(obj){
  $(function(){
    var id = obj.id.replace(':', '_');
    var socket = $('#socket-' + id);

    if (!socket.length) {
      socket.data('count', 0);
      socket = $(
        '<div>' +
          '<h2>' + obj.id + '</h2>' +
          '<canvas height=50></canvas>' +
          '<table><tr>' +
          '<th>Type</th>' +
          '<th>Packet</th>' +
          '<th>Data</th>' +
          '<th>Date</th>' +
          '</tr></table>' +
        '</div>'
      ).appendTo('#sockets');
      socket.attr('id', 'socket-' + id);

      var smoothie, time;
      var chart = socket.find('canvas')[0];

      var render = function(){
        if (smoothie) smoothie.stop();
        chart.width = document.body.clientWidth - 40;
        smoothie = new SmoothieChart({
          grid: {
            lineWidth: 0
          }
        });
        smoothie.streamTo(chart, 1000);
        time = new TimeSeries();
        smoothie.addTimeSeries(time, {
          strokeStyle: 'rgb(255, 255, 255)',
          fillStyle: 'rgba(255, 0, 0, 0)',
          lineWidth: 3
        });
      };

      render();
      window.onresize = render;

      setInterval(function(){
        time.append(+new Date, socket.data('count'));
        socket.data('count', 0);
      }, 1000);
    }

    socket.data('count', socket.data('count') + 1);

    if ('packet' == obj.type || 'packetCreate' == obj.type) {
      socket.find('table').append(
        '<tr>' +
          '<td>' + ('packetCreate' == obj.type ? 'Out' : 'In') + '</td>' +
          '<td>' + obj.data.type + '</td>' +
          '<td>' + obj.data.data + '</td>' +
          '<td>' + (new Date).toGMTString() + '</td>' +
        '</tr>'
      );
    }

    if ('close' == obj.type) {
      socket.find('h2').css('color', 'red');
    }

    if ('open' == obj.type) {
      socket.find('h2').css('color', 'green');
    }

  });
};
