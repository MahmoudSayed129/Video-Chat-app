import React, { useContext } from 'react';
import { Button } from '@material-ui/core';

import { SocketContext } from '../SocketContext';

const Notifications = () => {
  const { answerCall, call, callAccepted } = useContext(SocketContext);

  return (
      <div>
            <h4 style={{color : 'black' }}>Notifications : </h4>
            { call.isReceivingCall && !callAccepted ? (<div style={{ display: 'flex', justifyContent: 'space-around', color : 'black' }}>
                <h5>{call.name || 'unKnown'} is calling:</h5>
                <button className='btn btn-success' onClick={answerCall}>
                     Answer
                </button>
            </div>) : (
                <h5 className='text-danger'>There is No Notifications</h5>
            )}
      </div>
    
  );
};

export default Notifications;