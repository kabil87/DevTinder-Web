import io from "socket.io-client";

export const createSocketConnection = () => {
    return io("/", {              // ✅ use root
        path: "/feed/ws",         // ✅ correct path
    });
}