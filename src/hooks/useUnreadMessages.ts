import { useEffect, useState } from "react";
import { useRealtimeEvent } from "./useRealtimeEvent";
import * as messageService from "@/services/message.service";

export function useUnreadMessages(): number {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let ignore = false;

        messageService.getUnreadCount()
            .then((data) => { if (!ignore) setCount(data.count); })
            .catch(() => {});

        return () => { ignore = true; };
    }, []);

    useRealtimeEvent((event) => {
        if (event.type === "message.created" || event.type === "conversation.read" || event.type === "realtime.reconnected") {
            messageService.getUnreadCount().then((data) => setCount(data.count)).catch(() => {});
        }
    });

    return count;
}
