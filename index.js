const express = require("express");
const http = require("http");
const cors = require("cors");
const socket = require('socket.io');

const app = express();
const server = http.createServer(app);

const io = socket(server, {
	cors: {
		origin: "*"
	}
});

app.use(cors());

app.get('/' ,(req,res)=>{res.send('RUNNING')})

const PORT = process.env.PORT || 8000;

io.on("connection", (socket) => {
	socket.emit("me", socket.id);
	socket.on("disconnect", () => {
		socket.broadcast.emit("callEnded")
	});

	socket.on("callUser", ({ userToCall, signalData, from, name }) => {
		io.to(userToCall).emit("callUser", { signal: signalData, from, name });
	});

	socket.on("answerCall", (data) => {
		io.to(data.to).emit("callAccepted", data.signal)
	});
});

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));