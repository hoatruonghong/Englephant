// import React, { createContext, useEffect, useReducer, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import io from "socket.io-client";
// import Peer from 'peerjs';
// import {v4 as uuidv4} from "uuid";
// import { peersReducer } from "../reducers/peerReducer";
// import { addPeerAction } from "../reducers/peerActions";

// const WS = "http://localhost:8080";

// const ws = io(WS);

// export const RoomContext = createContext();

// const RoomContextProvider = ({children}) => {
//     let navigate = useNavigate();
//     const [me, setMe] = useState();
//     const [stream, setStream] = useState();
//     const [peers, dispatch] = useReducer(peersReducer, {})

//     const enterRoom = ({ roomId }) => {
//         console.log({roomId});
//         navigate(`/tutor/room/${roomId}`);
//     }
//     const getUsers = ({participants}) => {
//         console.log("participants", {participants});
//     }

//     useEffect(()=> {
//         const meId = uuidv4();
//         const peer = new Peer(meId);
//         setMe(peer);

//         try {
//             navigator.mediaDevices.getUserMedia({video: true, audio: true})
//             .then((stream) => {setStream(stream)})
//         } catch (error) {
//             console.log(error);
//         }

//         ws.on('room-created', enterRoom);
//         ws.on('get-users', getUsers);
//     }, []);

//     useEffect(()=>{
//         if (!me) return;
//         if (!stream) return;

//         ws.on("user-joined", ({peerId})=>{
//             const call = me.call(peerId, stream);
//             call.on("stream", (peerStream)=>{
//                 // console.log("new join", peerStream);
//                 dispatch(addPeerAction(peerId, peerStream));
//             });
//         });

//         me.on('call', (call)=>{
//             call.answer(stream);
//             call.on("stream", (peerStream)=>{
//                 dispatch(addPeerAction(call.peer, peerStream));
//             });
//         })
//     }, [me, stream]);

//     // Context data
//     const roomContextData = {ws, me, stream, peers}

//     return (
//         <RoomContext.Provider value={roomContextData}>
//             {children}
//         </RoomContext.Provider>
//     ) 
// }

// export default RoomContextProvider