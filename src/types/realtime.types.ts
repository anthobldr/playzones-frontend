import type { TicTacToeGame } from "./game.types";

export type RealtimeEvent =
    | { type: "game.invited"; game: TicTacToeGame }
    | { type: "game.started"; game: TicTacToeGame }
    | { type: "game.updated"; game: TicTacToeGame }
    | { type: "game.invitation_removed"; gameId: number; by: string }
    | { type: "realtime.reconnected" };

export interface RealtimeSubscription {
    hubUrl: string;
    topic: string;
}