// import React, { useEffect, useState, useRef } from 'react'

// import Peer from "simple-peer"
// import io from "socket.io-client"

// const socket = io.connect("http://localhost:5000")

// function TutorRoom() {
//     const [ me, setMe ] = useState("")
//     const [ stream, setStream ] = useState()
// 	const [ receivingCall, setReceivingCall ] = useState(false)
// 	const [ caller, setCaller ] = useState("")
// 	const [ callerSignal, setCallerSignal ] = useState()
// 	const [ callAccepted, setCallAccepted ] = useState(false)
// 	const [ idToCall, setIdToCall ] = useState("")
// 	const [ callEnded, setCallEnded] = useState(false)
// 	const [ name, setName ] = useState("")
// 	const myVideo = useRef(null)
// 	const userVideo = useRef(null)
// 	const connectionRef= useRef(null)

//     useEffect(()=>{
//         navigator.mediaDevices.getUserMedia({ video: true, audio: true })
//         .then((stream) => {
// 			setStream(stream)
// 			myVideo.current.srcObject = stream
// 		})
//         .catch((err) => {
//             console.log("err", err);
//         })

//         socket.on("me", (id) => {
// 			setMe(id)
// 		})

// 		socket.on("callUser", (data) => {
// 			setReceivingCall(true)
// 			setCaller(data.from)
// 			setName(data.name)
// 			setCallerSignal(data.signal)
// 		})
// 	}, [])

//     const callUser = (id) => {
//         console.log("call to ", id);
//         const peer = new Peer({
// 			initiator: true,
// 			trickle: false,
// 			stream: stream
// 		})
// 		peer.on("signal", (data) => {
// 			socket.emit("callUser", {
// 				userToCall: id,
// 				signalData: data,
// 				from: me,
// 				name: name
// 			})
// 		})
// 		peer.on("stream", (stream) => {
			
// 			userVideo.current.srcObject = stream
			
// 		})
// 		socket.on("callAccepted", (signal) => {
// 			setCallAccepted(true)
// 			peer.signal(signal)
// 		})

// 		connectionRef.current = peer
//         console.log("connectionRef", connectionRef.current);

//     }

//     const answerCall = () => {
//         setCallAccepted(true)
// 		const peer = new Peer({
// 			initiator: false,
// 			trickle: false,
// 			stream: stream
// 		})
// 		peer.on("signal", (data) => {
// 			socket.emit("answerCall", { signal: data, to: caller })
// 		})
// 		peer.on("stream", (stream) => {
// 			userVideo.current.srcObject = stream
// 		})

// 		peer.signal(callerSignal)
// 		connectionRef.current = peer
//         console.log("connectionRef", connectionRef.current);
//     }

//     const leaveCall = () => {
// 		setCallEnded(true);
//         connectionRef.current.destroy();
//         console.log("connection  ",connectionRef.current);   
// 	}


//     return (
//         <>
// 		<div className="container">
// 			<div className="video-container">
// 				<div className="video">
// 					{stream &&  <video muted ref={myVideo} autoPlay style={{ width: "300px" }} />}
// 				</div>
// 				<div className="video">
// 					{callAccepted && !callEnded ?
// 					<video ref={userVideo} autoPlay muted style={{ width: "300px"}} /> :
// 					null}
// 				</div>
// 			</div>
// 			<div className="myId">
// 				<input
// 					id="filled-basic"
// 					label="Name"
// 					variant="filled"
// 					value={name}
//                     placeholder='text name'
// 					onChange={(e) => setName(e.target.value)}
// 					style={{ marginBottom: "20px" }}
// 				/>
// 				<p style={{ marginBottom: "2rem", backgroundColor: 'yellow'}}>{me}</p>

// 				<input
// 					id="filled-basic"
// 					label="ID to call"
// 					variant="filled"
//                     placeholder='id to call'
// 					value={idToCall}
// 					onChange={(e) => setIdToCall(e.target.value)}
// 				/>
// 				<div className="call-button">
// 					{callAccepted && !callEnded ? (
// 						<button variant="contained" color="secondary" onClick={leaveCall}>
// 							End Call
// 						</button>
// 					) : (
// 						<button color="primary" aria-label="call" onClick={() => callUser(idToCall)}>
// 							Start call
// 						</button>
// 					)}
// 					{idToCall}
// 				</div>
// 			</div>
// 			<div>
// 				{receivingCall && !callAccepted ? (
// 						<div className="caller">
// 						<h1 >{name} is calling...</h1>
// 						<button variant="contained" color="primary" onClick={answerCall}>
// 							Answer
// 						</button>
// 					</div>
// 				) : null}
// 			</div>
// 		</div>
// 		</>
//     )
// }

// export default TutorRoom