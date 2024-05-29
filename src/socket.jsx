import { tokenAccess } from "./router/config";

export let socket = new WebSocket("ws://localhost:3001");

socket.onopen = function (e) {
    const message = JSON.stringify({
        event: "auth",
        data: tokenAccess,
    });
    socket.send(message);
};
