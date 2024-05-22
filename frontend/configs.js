// const socket = io('http://localhost:3000');
const socket = io('https://call-ring-prototype-backend.onrender.com');

const userIdInput = document.getElementById('userId');
const calleeIdInput = document.getElementById('calleeId');
const localAudio = document.getElementById('localAudio');
const remoteAudio = document.getElementById('remoteAudio');
const logDiv = document.getElementById('log');
const fillIn = document.getElementById('fillIn');

fillIn.addEventListener('click', ()=>{
    userIdInput.value = 'two';
    calleeIdInput.value = 'one';
    
    socket.emit('register', userIdInput.value);
    log('Registered with ID: ' + userIdInput.value);
    startLocalStream();
})

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
    {
      urls: 'turn:numb.viagenie.ca',
      username: 'webrtc@live.com',
      credential: 'password',
    },
    {
      urls: 'turn:numb.viagenie.ca:3478',
      username: 'webrtc@live.com',
      credential: 'password',
    },
    {
      urls: 'turn:turn.bistri.com:80',
      username: 'homeo',
      credential: 'homeo',
    },
    {
      urls: 'turn:turn.bistri.com:3478',
      username: 'homeo',
      credential: 'homeo',
    },
    {
      urls: 'turn:turn.anyfirewall.com:443',
      username: 'webrtc',
      credential: 'webrtc',
    },
  ],
});
