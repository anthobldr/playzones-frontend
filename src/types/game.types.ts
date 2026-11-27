import type { Avatar } from "./avatar.types";

export type GameStatus = "pending" | "in_progress" | "won" | "draw";
export type TicTacToeSymbol = "X" | "O";

export interface GameStats {
    played: number;
    won: number;
    draws: number;
    lost: number;
}

export interface TicTacToeGame {
    id: number;
    board: string;
    status: GameStatus;
    yourSymbol: TicTacToeSymbol;
    isYourTurn: boolean;
    winnerId: number | null;
    opponent: { id: number; username: string; avatar: Avatar | null };
    updatedAt: string;
}