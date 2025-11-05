import './style.css'
import { io } from "socket.io-client";

const CHANNEL = "message";

function connectWs(ip: string) {
  const socket = io(`http://${ip}:3000`);

  socket.on("connect", () => {
    console.log("✅ WebSocket connecté");
  });

  socket.on(CHANNEL, (msg) => {
    displayMessage(msg);
  });
}

function displayWhoami(serverIP: string) {
  document.getElementById("whoami")!.textContent = serverIP;
}

function displayMessage(message: string) {
  document.getElementById("message")!.textContent = message;
}

async function sendMessage() {
  const input = document.getElementById("msgInput") as HTMLInputElement;
  const text = input.value;
  if (!text) return;

  await fetch(`http://${window.location.hostname}:3000/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: text })
  });

  input.value = "";
}

window.addEventListener("load", async () => {
  const call = await fetch('http://localhost:3000/api/whoami');
  const json = await call.json();
  displayWhoami(json.ip[0]);
  connectWs(json.ip[0]);

  document.getElementById("sendBtn")!.addEventListener("click", sendMessage);
});
