import React, { useState, useContext } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { SocketContext } from '../SocketContext';

const Sidebar = ({ children }) => {
  const { myId, callAccepted, name, setName, callEnded, leaveCall, callUser } = useContext(SocketContext);
  const [idToCall, setIdToCall] = useState('');

  return (
    <div className='m-3'> 
        <div className="card bg-warning">
            <div className="row justify-content-center">
                <div className="card m-2 p-3 col-sm-5 p-3" style={{width : '40rem', color : 'black'}}>
                    <div className="row">
                        <div className="card col-sm-6">
                             <h5>Enter Your Name : </h5>
                             <input type="text" className='form-control' value={name} onChange={(e) => setName(e.target.value)}/>
                        </div>
                        <div className="card justify-content-center col-sm-6">
                            <CopyToClipboard text={myId} >
                                  <button className='btn btn-info'>
                                      Copy Your ID
                                </button>
                            </CopyToClipboard>
                        </div>
                
                    </div>
                <div className="row justify-content-center mt-3">
                <div className="text-center col-sm-4">
                     {callAccepted && !callEnded ? (
                         <React.Fragment>
                            <h4>Call settings : </h4>
                            <button className='btn btn-danger'  onClick={leaveCall}>
                              Hang Up
                            </button>
                         </React.Fragment>
                      ) : (
                        <React.Fragment>
                            <h4>Making call : </h4>
                            <input placeholder='ID TO CALL' type='text' className='form-control mb-3' value={idToCall} onChange={(e) => setIdToCall(e.target.value)}/>
                            <button className='btn btn-success' onClick={() => callUser(idToCall)}>
                                 Call <i className="fa fa-phone" aria-hidden="true"></i>
                            </button>
                        </React.Fragment>
                      )}
                </div>
            </div>
            </div>
                <div className="card m-2 p-3 col-sm-5 p-3">
                    {children}
                 </div>
             </div>
        </div>
    </div>
  );
};

export default Sidebar;