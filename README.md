# Video Chat app :-

+ Link to video :- https://www.youtube.com/watch?v=SvN0jF0LISc
+ Link to demo  :- https://video-chat-app-mahmoud-sayed.netlify.app/


* an application to initiate a video call between tow users by sharing thier id 
one of them will be the host of the call (who instantiate it) and he has the ability to change the other user background image
(not done in this during the limitation of time from my side) and the reciever will be normal user, each user have the ability
to turn on/off the mic or camera at any time and also can hang up the call

* I used webRTC (Simple-Peer) to instantiate real time peer to peer connection to have the ability to share date between the two peers
and also socket io so that the server can listen to events from the client side and emit events

* I divided the project into two main parts :-	
	* a) server side where I used Node JS.
		+index.js has all the logic of server and socket-io events handlers 
	* b) client side in which I used React JS to build it.
		+ SocketContext which include all logic of socket-io events handlers and also logic for the call method like :- 
			* answerCall			  
			* leaveCall  			  
			* callUser       		  
			* other socket-io events handlers 
		+ App.js which contain the components of the application 
		+ compnents :-
			* video handle the two videos sharing                        
			* options which have some info and we can make call from it  
      * notificaions where we can recieve call on it               
