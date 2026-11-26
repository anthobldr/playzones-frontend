import type { TicTacToeGame } from "./game.types";
import type { ChatMessage } from "./message.types";

export type RealtimeEvent =
    | { type: "game.invited"; game: TicTacToeGame }
    | { type: "game.started"; game: TicTacToeGame }
    | { type: "game.updated"; game: TicTacToeGame }
    | { type: "game.invitation_removed"; gameId: number; by: string }
    | { type: "message.created"; conversationId: number; message: ChatMessage }
    | { type: "realtime.reconnected" };

export interface RealtimeSubscription {
    hubUrl: string;
    topic: string;
}