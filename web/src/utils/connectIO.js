import { io } from 'socket.io-client'

const connectIOSocket = io.connect(
    "http://localhost:5000/webrtcPeer",
    {
      path: '/io/webrtc',
      query: {
        room: window.location.pathname,
      }
    }
  )

export default connectIOSocket