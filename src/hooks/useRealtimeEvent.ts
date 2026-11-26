import { useContext, useEffect, useEffectEvent } from "react";
import { RealtimeContext } from "@/context/RealtimeContext";
import type { RealtimeEvent } from "@/types";

export function useRealtimeEvent(handler: (event: RealtimeEvent) => void) {
    const context = useContext(RealtimeContext);
    if (!context) {
        throw new Error("useRealtimeEvent doit être utilisé dans RealtimeProvider");
    }

    const onEvent = useEffectEvent(handler);
    const { subscribe } = context;

    useEffect(() => subscribe((event) => onEvent(event)), [subscribe]);
}