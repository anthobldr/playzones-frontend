import { useCallback, useEffect, useMemo, useRef } from "react";
import type { ReactNode } from "react";
import { RealtimeContext, type RealtimeListener } from "@/context/RealtimeContext";
import { useAuth } from "@/hooks/useAuth";
import { subscribeToRealtime } from "@/services/realtime.service";
import type { RealtimeEvent } from "@/types";

const MAX_RETRY_DELAY = 30_000;

export function RealtimeProvider({ children }: { children: ReactNode }) {
    const { user } = useAuth();
    const userId = user?.id;
    const listenersRef = useRef(new Set<RealtimeListener>());

    const subscribe = useCallback((listener: RealtimeListener) => {
        listenersRef.current.add(listener);
        return () => {listenersRef.current.delete(listener);};
    }, []);

    useEffect(() => {
        if (!userId) return;

        let source: EventSource | null = null;
        let retryTimer: number | undefined;
        let stopped = false;
        let attempts = 0;
        let hasConnectedOnce = false;

        const emit = (event: RealtimeEvent) => {
            listenersRef.current.forEach((listener) => listener(event));
        };

        const scheduleReconnect = () => {
            if (stopped) return;
            attempts += 1;

            const delay = Math.min(MAX_RETRY_DELAY, 1000 * 2 ** attempts);
            retryTimer = window.setTimeout(connect, delay);
        };

        async function connect() {
            try {
                const { hubUrl, topic } = await subscribeToRealtime();
                if (stopped) return;

                const url = new URL(hubUrl);
                url.searchParams.append("match", topic);
                source = new EventSource(url, { withCredentials: true });

                source.onopen = () => {
                    attempts = 0;

                    if (hasConnectedOnce) emit({ type: "realtime.reconnected" });
                    hasConnectedOnce = true;
                };

                source.onmessage = (message) => {
                    try {
                        emit(JSON.parse(message.data) as RealtimeEvent);
                    } catch {
                        // Message illisible
                    }
                };

                source.onerror = () => {
                    if (source?.readyState === EventSource.CLOSED) {
                        source.close();
                        scheduleReconnect();
                    }
                };
            } catch {
                scheduleReconnect();
            }
        }

        connect();

        return () => {
            stopped = true;
            window.clearTimeout(retryTimer);
            source?.close();
        };
    }, [userId]);

    const value = useMemo(() => ({ subscribe }), [subscribe]);

    return <RealtimeContext.Provider value={value}>{children}</RealtimeContext.Provider>;
}
