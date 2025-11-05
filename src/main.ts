import './style.css'
import typescriptLogo from './typescript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.ts'
import { io } from "socket.io-client";

const CHANNEL = "message";

function connectWs(ip: string) {
	const socket= io(`http://${ip}:3000`);
	socket.on("connect", () => {
		console.log("Connected to server");
	});
	socket.on(CHANNEL, (msg) => displayMessage(msg));
}

function displayWhoami(serverIP: string) {
	const div= document.getElementById("whoami")!;
	div.textContent= serverIP;
}
function displayMessage(message: string) {
	const div = document.getElementById("message")!;
	div.textContent = message;
}

window.addEventListener("load", async() => {
	const call = await fetch('http://localhost:3000/api/whoami');
	try {
	const json = await call.json();
	displayWhoami(json.ip);
	connectWs(json.ip);
	} catch (e) {
		console.error("Error parsing JSON:", e);
		return;
	}

});
