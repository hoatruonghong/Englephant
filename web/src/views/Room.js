import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { RoomContext } from "../contexts/RoomContext";
import VideoPlayer from "../components/tutor/VideoPlayer";
function Room() {
    const {id} = useParams();
    const {ws, me, stream, peers} = useContext(RoomContext);
    const [ remoteStream, setRemoteStream ] = useState(null);

    useEffect(()=>{
        if(me) ws.emit("join-room", {roomId: id, peerId: me._id});
    }, [id, me, ws]);

    useEffect(()=>{
        setRemoteStream(Object.values(peers)[0].stream);
    }, [remoteStream]);

    return (
        <div>
            roommmm {id}
            <VideoPlayer stream={stream}/>
            <VideoPlayer stream={remoteStream} />

        </div>
    )
}

export default Room