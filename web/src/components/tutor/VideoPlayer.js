import React, { useEffect, useRef } from 'react'

function VideoPlayer({stream}) {
    const videoRef = useRef(null);

    useEffect(()=>{
        if (videoRef.current && stream) {
            videoRef.current.srcObject = stream;
        }
    }, [stream]);

    return (
        <video ref={videoRef} autoPlay muted/>
    )
}

export default VideoPlayer