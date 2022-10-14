import React, { createContext, useState, useRef, useEffect } from 'react';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';

const SocketContext = createContext();

const socket = io('https://video-chat-app-2022.herokuapp.com/');

const ContextProvider = ({ children }) => {
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [stream, setStream] = useState();
  const [name, setName] = useState('');
  const [call, setCall] = useState({});
  const [myId, setMyID] = useState("");

  const myVideo = useRef({});
  const userVideo = useRef({});
  const connectionRef = useRef({});

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);
        myVideo.current.srcObject = currentStream;
        console.log(myVideo);
        console.log(currentStream);
      });

    socket.on('me', (id) => {setMyID(id) 
                            console.log(id)
                            console.log("id "+myId)});
    
    socket.on('callUser', ({ from, host ,name: callerName, signal }) => {
      setCall({ isReceivingCall: true, host ,from, name: callerName, signal });
    });
  }, [socket]);

  const answerCall = () => {
    setCallAccepted(true);

    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on('signal', (data) => {
      socket.emit('answerCall', { signal: data, to: call.from });
    });

    peer.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    peer.signal(call.signal);

    connectionRef.current = peer;
  };

  const callUser = (id) => {
    const peer = new Peer({ initiator: true, trickle: false, stream });

    peer.on('signal', (data) => {
      socket.emit('callUser', { userToCall: id, signalData: data, from: myId, host : myId, name });
    });

    peer.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    socket.on('callAccepted', (signal) => {
      setCallAccepted(true);

      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);

    connectionRef.current.destroy();

    window.location.reload();
  };

  const toggleVideo = ()=>{
        stream.getTracks().find(track => track.kind === 'video').enabled = !stream.getTracks().find(track => track.kind === 'video').enabled ;
        myVideo.current.srcObject = stream;
  }
  const toggleMic = ()=>{
        stream.getTracks().find(track => track.kind === 'audio').enabled = !stream.getTracks().find(track => track.kind === 'audio').enabled ;
        myVideo.current.srcObject = stream;
  }
  return (
    <SocketContext.Provider value={{
        toggleVideo,
        toggleMic,
      call,
      callAccepted,
      myVideo,
      userVideo,
      stream,
      name,
      setName,
      callEnded,
      myId,
      callUser,
      leaveCall,
      answerCall,
    }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { ContextProvider, SocketContext };