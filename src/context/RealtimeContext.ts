import { createContext } from "react";
import type { RealtimeEvent } from "@/types";

export type RealtimeListener = (event: RealtimeEvent) => void;

export interface RealtimeContextType {
    subscribe: (listener: RealtimeListener) => () => void;
}

export const RealtimeContext = createContext<RealtimeContextType | null>(null);