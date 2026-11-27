import { apiFetch } from "./api";
import type { GameStats, TicTacToeGame } from "@/types";

const TIC_TAC_TOE = "/games/tic-tac-toe";

export const getMyGames = () =>
    apiFetch<TicTacToeGame[]>(TIC_TAC_TOE);

export const getMyStats = () =>
    apiFetch<GameStats>(`${TIC_TAC_TOE}/stats`);

export const getGame = (gameId: number) =>
    apiFetch<TicTacToeGame>(`${TIC_TAC_TOE}/${gameId}`);

export const challengeFriend = (opponentId: number) =>
    apiFetch<TicTacToeGame>(TIC_TAC_TOE, { method: "POST", body: JSON.stringify({ opponentId }) });

export const playMove = (gameId: number, cell: number) =>
    apiFetch<TicTacToeGame>(`${TIC_TAC_TOE}/${gameId}/moves`, { method: "POST", body: JSON.stringify({ cell }) });

export const acceptInvitation = (gameId: number) =>
    apiFetch<TicTacToeGame>(`${TIC_TAC_TOE}/${gameId}/accept`, { method: "POST" });

export const removeInvitation = (gameId: number) =>
    apiFetch<void>(`${TIC_TAC_TOE}/${gameId}`, { method: "DELETE" });

export const forfeitGame = (gameId: number) =>
    apiFetch<TicTacToeGame>(`${TIC_TAC_TOE}/${gameId}/forfeit`, { method: "POST" });