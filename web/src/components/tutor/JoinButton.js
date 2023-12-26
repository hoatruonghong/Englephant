import { useContext } from "react"
import { RoomContext } from "../../contexts/RoomContext";

export const JoinButton = () => {
    const {ws} = useContext(RoomContext);

    const createRoom = () => {
        ws.emit("create-room");
        // if (roomId) navigate(`/tutor/room/${roomId}`);
    }

    return (
        <button className="joinButton" onClick={createRoom}>
            GO
        </button>
    )
}