import type { TicTacToeGame } from "@/types";

export function getGameLabel(game: TicTacToeGame): string {
    switch (game.status) {
        case "pending":
            return game.yourSymbol === "X" ? "Invitation envoyée" : "Invitation reçue";
        case "draw":
            return "Match nul";
        case "won":
            return game.winnerId === game.opponent.id ? "Défaite" : "Victoire";
        default:
            return game.isYourTurn ? "À toi de jouer" : `Tour de ${game.opponent.username}`;
    }
}
