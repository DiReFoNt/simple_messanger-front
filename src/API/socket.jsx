import { tokenAccess } from "../assets/Global/UserData";

export const socketURL = "ws://localhost:3001";
export let socket = new WebSocket(socketURL);

export function initializeSocket() {
    socket = new WebSocket(socketURL);

    socket.onopen = function (e) {
        console.log("WebSocket is open now.");
        authenticateSocket();
    };

    socket.onclose = function (e) {
        console.log("WebSocket is closed now.");
    };

    socket.onerror = function (error) {
        console.error(`WebSocket error: ${error}`);
    };

    socket.onmessage = function (event) {
        const message = JSON.parse(event.data);
        console.log("Received message:", message);
    };
}

function authenticateSocket() {
    console.log("Authenticating...");
    const message = JSON.stringify({
        event: "auth",
        data: localStorage.getItem("access_token"),
    });
    socket.send(message);
}

export function sendMessage(event, data) {
    if (socket && socket.readyState === WebSocket.OPEN) {
        const message = JSON.stringify({ event, data });
        socket.send(message);
    } else {
        console.error("WebSocket is not open. Cannot send message.");
    }
}
