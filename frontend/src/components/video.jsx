import React, { useContext } from 'react';
import { SocketContext } from '../SocketContext';

const VideoPlayer = () => {
  const { name, callAccepted, myVideo, userVideo,toggleVideo, callEnded,toggleMic, stream, call, myId } = useContext(SocketContext);
  const backgroundImage = '';
  let mic = true;
  const toggle = () => {
    console.log();
    toggleMic();
    mic = !mic;
  }
  return (
    <div className='card mx-3 mt- bg-secondary' >
        <div className='row  p-3 justify-content-center p-3'>
                
            <div className='card m-2 p-3 col-sm-5 my-2'>
                    <h5 style={{color :  'black'}}>{name || 'Name?'} {callAccepted && !callEnded && !call.from && (<span>(HOST)</span>)}</h5>
                <video muted  playsInline ref={myVideo} autoPlay/>
                <div className='text-center mt-2' style={{color : 'black'}}>
                <button className='btn btn-sm btn-dark mx-3' onClick={()=>toggleVideo()}><i className="fa fa-video-camera" aria-hidden="true"></i></button>
                <button className='btn btn-sm btn-dark' onClick={()=>toggle()}><i className="fa fa-microphone" aria-hidden="true"></i></button>
                </div>
            </div>
            {/* <button onClick={sotpVideo()}>stop</button> */}
            {callAccepted && !callEnded && (
                <React.Fragment>
                    <div className='card m-2 p-3 col-sm-5'>
                        <h5 style={{color :  'black'}}>{call.name || 'unKnown'}</h5>
                        <video  ref={userVideo} playsInline autoPlay/>
                        {!call.from && 
                            (
                            <div className="text-center mt-2">
                                <button className='btn-primary btn'>Change BackgroundImage <i className="fa fa-picture-o" aria-hidden="true"></i></button>
                            </div>
                            )    
                        }
                    </div>
                </React.Fragment>
            )}
        </div>
    </div>
  );
};

export default VideoPlayer;