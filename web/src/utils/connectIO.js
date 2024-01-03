import { io } from 'socket.io-client'

const connectIOSocket = io.connect(
    "http://localhost:5000/webrtcPeer",
    // "https://englephant-server.adaptable.app/webrtcPeer",
    {
      path: '/io/webrtc',
      // upgrade: false,
      transports: ['websocket'],
      query: {
        room: window.location.pathname,
      },
    }
  )

export default connectIOSocket