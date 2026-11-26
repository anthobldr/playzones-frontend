import { apiFetch } from "./api";
import type { TicTacToeGame } from "@/types";

const TIC_TAC_TOE = "/games/tic-tac-toe";

export const getMyGames = () =>
    apiFetch<TicTacToeGame[]>(TIC_TAC_TOE);

export const getGame = (gameId: number) =>
    apiFetch<TicTacToeGame>(`${TIC_TAC_TOE}/${gameId}`);

export const challengeFriend = (opponentId: number) =>
    apiFetch<TicTacToeGame>(TIC_TAC_TOE, { method: "POST", body: JSON.stringify({ opponentId }) });

export const playMove = (gameId: number, cell: number) =>
    apiFetch<TicTacToeGame>(`${TIC_TAC_TOE}/${gameId}/moves`, { method: "POST", body: JSON.stringify({ cell }) });