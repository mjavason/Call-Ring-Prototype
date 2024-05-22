// const socket = io('http://localhost:3000');
const socket = io('https://call-ring-prototype-backend.onrender.com');

const userIdInput = document.getElementById('userId');
const calleeIdInput = document.getElementById('calleeId');
const localAudio = document.getElementById('localAudio');
const remoteAudio = document.getElementById('remoteAudio');
const logDiv = document.getElementById('log');
const fillIn = document.getElementById('fillIn');

fillIn.addEventListener('click', () => {
  userIdInput.value = 'two';
  calleeIdInput.value = 'one';

  socket.emit('register', userIdInput.value);
  log('Registered with ID: ' + userIdInput.value);
  startLocalStream();
});

function log(message) {
  const p = document.createElement('p');
  p.textContent = message;
  logDiv.appendChild(p);
  logDiv.scrollTop = logDiv.scrollHeight; // Scroll to the bottom
}

const peerConnection = new RTCPeerConnection({
  iceServers: [
    { urls: 'stun:stun.l.google.com:19302' },
    { urls: 'stun:stun1.l.google.com:19302' },
    { urls: 'stun:stun2.l.google.com:19302' },
    { urls: 'stun:stun3.l.google.com:19302' },
    { urls: 'stun:stun4.l.google.com:19302' },
    {
      urls: 'stun:stun.services.mozilla.com',
      username: '',
      credential: '',
    },
    {
      urls: 'stun:stun.stunprotocol.org:3478',
      username: '',
      credential: '',
    },
    {
      urls: 'stun:stun.voipbuster.com',
      username: '',
      credential: '',
    },
    {
      urls: 'stun:stun.voipstunt.com',
      username: '',
      credential: '',
    },
    {
      urls: 'stun:stun.voxgratia.org',
      username: '',
      credential: '',
    },
    {
      urls: 'stun:stun.xten.com',
      username: '',
      credential: '',
    },
    {
      urls: 'stun:stun.schlund.de',
      username: '',
      credential: '',
    },
    {
      urls: 'stun:stun.iptel.org',
      username: '',
      credential: '',
    },

    //Open Relay Project Turn Servers
    {
      urls: 'stun:stun.relay.metered.ca:80',
    },
    {
      urls: 'turn:global.relay.metered.ca:80',
      username: '5dde2d2045285ff71a3bfabd',
      credential: 'ePktKiKENLHvMBA4',
    },
    {
      urls: 'turn:global.relay.metered.ca:80?transport=tcp',
      username: '5dde2d2045285ff71a3bfabd',
      credential: 'ePktKiKENLHvMBA4',
    },
    {
      urls: 'turn:global.relay.metered.ca:443',
      username: '5dde2d2045285ff71a3bfabd',
      credential: 'ePktKiKENLHvMBA4',
    },
    {
      urls: 'turns:global.relay.metered.ca:443?transport=tcp',
      username: '5dde2d2045285ff71a3bfabd',
      credential: 'ePktKiKENLHvMBA4',
    },
    // Express turn
    // {
    //   urls: 'relay1.expressturn.com:3478',
    //   username: 'efYNM7FLFH0TGPR1RA',
    //   credential: 'Wcyy9dXmtIakraMH',
    // },
  ],
});
