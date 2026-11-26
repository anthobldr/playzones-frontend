import { apiFetch } from "./api";
import type { RealtimeSubscription } from "@/types";

export const subscribeToRealtime = () =>
    apiFetch<RealtimeSubscription>("/realtime/subscribe", { method: "POST" });