import './style.css'
import { io } from "socket.io-client";

const CHANNEL = "message";

function connectWs(ip: string) {
  const socket = io(`http://${ip}:3000`);

  socket.on("connect", () => {
    console.log("✅ WebSocket connecté");
  });

  socket.on(CHANNEL, (msg) => displayMessage(msg));
}

function displayWhoami(serverIP: string) {
  document.getElementById("whoami")!.textContent = serverIP;
}

function displayMessage(message: string) {
  document.getElementById("message")!.textContent = message;
}

window.addEventListener("load", async () => {
  const call = await fetch('http://localhost:3000/api/whoami');
  const json = await call.json();
  displayWhoami(json.ip[0]);
  connectWs(json.ip[0]);
});
