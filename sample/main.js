const localVideo = document.getElementById('localVideo');
const remoteVideo = document.getElementById('remoteVideo');
const startButton = document.getElementById('startButton');
const callButton = document.getElementById('callButton');
const answerButton = document.getElementById('answerButton');
const offerTextarea = document.getElementById('offer');
const answerTextarea = document.getElementById('answer');

let localStream;
let peerConnection;

const configuration = {
  iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
};

startButton.onclick = async () => {
  try {
    console.log('Requesting access to media devices...');
    localStream = await navigator.mediaDevices.getUserMedia({ video: true});
    localVideo.srcObject = localStream;
    console.log('Access to media devices granted.');
  } catch (error) {
    console.error('Error accessing media devices:', error);
  }
};

callButton.onclick = async () => {
  try {
    console.log('Creating peer connection...');
    peerConnection = createPeerConnection();
    localStream.getTracks().forEach(track => peerConnection.addTrack(track, localStream));
    
    console.log('Creating offer...');
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);
    offerTextarea.value = JSON.stringify(peerConnection.localDescription);
    console.log('Offer created:', offer);
  } catch (error) {
    console.error('Error creating offer:', error);
  }
};

answerButton.onclick = async () => {
  try {
    console.log('Parsing offer from remote peer...');
    const offer = JSON.parse(offerTextarea.value);
    if (!peerConnection) {
      console.log('Creating new peer connection...');
      peerConnection = createPeerConnection();
    }
    console.log('Setting remote description...');
    await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
    
    console.log('Creating answer...');
    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);
    answerTextarea.value = JSON.stringify(peerConnection.localDescription);
    console.log('Answer created:', answer);
  } catch (error) {
    console.error('Error creating answer:', error);
  }
};

answerTextarea.onchange = async () => {
  try {
    console.log('Parsing answer from remote peer...');
    const answer = JSON.parse(answerTextarea.value);
    if (peerConnection.signalingState === 'have-local-offer') {
        console.log('Setting remote description from answer...');
        await peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
        console.log('Remote description set successfully.');
      } else {
        console.log('Unexpected signaling state:', peerConnection.signalingState);
      }
  } catch (error) {
    console.error('Error setting remote description from answer:', error);
  }
};

function createPeerConnection() {
  console.log('Creating new peer connection...');
  const pc = new RTCPeerConnection(configuration);

  pc.onicecandidate = event => {
    if (event.candidate) {
      console.log('ICE candidate:', JSON.stringify(event.candidate));
    }
  };

  pc.ontrack = event => {
    console.log('Received remote track:', event.track);
    remoteVideo.srcObject = event.streams[0];
  };

  pc.oniceconnectionstatechange = () => {
    console.log('ICE connection state:', pc.iceConnectionState);
    switch (pc.iceConnectionState) {
      case 'checking':
        console.log('ICE connection state: Checking...');
        break;
      case 'connected':
        console.log('ICE connection state: Connected.');
        break;
      case 'completed':
        console.log('ICE connection state: Connection completed.');
        break;
      case 'disconnected':
        console.log('ICE connection state: Disconnected.');
        break;
      case 'failed':
        console.log('ICE connection state: Failed.');
        break;
      case 'closed':
        console.log('ICE connection state: Closed.');
        break;
    }
  };

//   pc.oniceconnectionstatechange = () => {
//     console.log('ICE connection state change:', pc.iceConnectionState);
//   };

  return pc;
}
