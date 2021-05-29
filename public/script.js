const socket = io()
const videoGrid = document.getElementById("video-grid");

const myZonePeer = new Peer(undefined, {
  host: "localhost",
  port: 9001,
  path: "/"
})
const peers = {};

const myVideo = document.createElement("video");
const mySpan = document.createElement("span")
myVideo.muted = true;

if ('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices) {
  mySpan.innerText = "ACEITA SIM"
  videoGrid.append(mySpan)
}

navigator.mediaDevices.getUserMedia({
  audio: true,
  video: true
}).then(stream => {
    addVideoStream(myVideo, stream)
}).catch(error => {
  console.log(error)
})


const addVideoStream = (video, stream) => {
  video.srcObject = stream;
  video.addEventListener("loadedmetadata", () => {
    video.play()
  })

  videoGrid.append(video)
}



socket.emit("join-room", ROOM_ID, Math.floor(Math.random() * 100))


socket.on("user-connected", userId => {
  console.log(userId)
})