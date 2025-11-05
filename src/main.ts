import './style.css'
import { io } from "socket.io-client";

const CHANNEL = "message";

function connectWs() {
  const socket = io(`http://${window.location.hostname}:4000`);

  socket.on("connect", () => console.log("✅ WebSocket connecté"));
  socket.on(CHANNEL, (msg) => displayMessage(msg));
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

window.addEventListener("load", () => {
  connectWs();
  document.getElementById("sendBtn")!.addEventListener("click", sendMessage);
});
