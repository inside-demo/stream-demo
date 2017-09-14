navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

navigator.getUserMedia({
    video: true,
    audio: false
  }, stream => {
    const Peer = require('simple-peer');
    const peer = new Peer({
      initiator: location.hash === '#init',
      trickle: false,
      stream: stream
    });

    peer.on('signal', data => {
      document.getElementById('yourId').value = JSON.stringify(data)
    })

    document.getElementById('connect').addEventListener('click', () => {
      var otherId = JSON.parse(document.getElementById('otherId').value);

      peer.signal(otherId);
    });

    document.getElementById('send').addEventListener('click', () => {
      var yourMessage = document.getElementById('yourMessage').value;

      peer.send(yourMessage);
    });

    peer.on('data', data => {
      document.getElementById('message').textContent += `${data}\n`;
    })

    peer.on('stream', stream => {
      var video = document.createElement('video');
          video.srcObject = stream;

      document.body.appendChild(video);
      video.play();
    })
  }, err => {
    console.log(err);
  })