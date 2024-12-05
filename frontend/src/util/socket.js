import io from "socket.io-client";
import { SOCKET_URL } from "../api/service";

class Socket {
    static socket = null;
    static getSocket = () => {
        if (Socket.socket === null) {
           
            Socket.socket = io(
                SOCKET_URL,
                {
                    transports: ["websocket"],
                    upgrade: false,
                    reconnection: true,
                    reconnectionAttempts: Infinity,
                    reconnectionDelay: 1000,
                    reconnectionDelayMax: 5000
                }
            );
        }
        return Socket.socket;
    };
}

export default Socket;

