import { useEffect, useState } from "react";

const WS_URL = 'ws://localhost:8080';

export const useSocket = () => {
    const [socket, setSocket] = useState<WebSocket | null>(null);

    useEffect(() => {
        const ws = new WebSocket(WS_URL);

        ws.onopen = () => {
            setSocket(ws);
        };
 
        ws.onclose = () => {
            setSocket(null);
        };

        // Cleanup function
        return () => {
            // Close WebSocket if it's open
            if (ws.readyState === WebSocket.OPEN) {
                ws.close();
            }
        };
    }, []);

    return socket; 
};