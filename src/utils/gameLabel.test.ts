import { describe, expect, it } from "vitest";
import type { TicTacToeGame } from "@/types";
import { getGameLabel } from "./gameLabel";

function makeGame(overrides: Partial<TicTacToeGame>): TicTacToeGame {
    return {
        id: 1,
        board: "---------",
        status: "in_progress",
        yourSymbol: "X",
        isYourTurn: false,
        winnerId: null,
        opponent: { id: 2, username: "Bob", avatar: null },
        updatedAt: "2026-11-26T18:00:00+00:00",
        ...overrides,
    };
}

describe("getGameLabel", () => {
    it("distingue l'invitation envoyée (X) de l'invitation reçue (O)", () => {
        expect(getGameLabel(makeGame({ status: "pending", yourSymbol: "X" }))).toBe("Invitation envoyée");
        expect(getGameLabel(makeGame({ status: "pending", yourSymbol: "O" }))).toBe("Invitation reçue");
    });

    it("indique à qui c'est le tour", () => {
        expect(getGameLabel(makeGame({ isYourTurn: true }))).toBe("À toi de jouer");
        expect(getGameLabel(makeGame({ isYourTurn: false }))).toBe("Tour de Bob");
    });

    it("donne le résultat d'une partie terminée", () => {
        expect(getGameLabel(makeGame({ status: "won", winnerId: 1 }))).toBe("Victoire");
        expect(getGameLabel(makeGame({ status: "won", winnerId: 2 }))).toBe("Défaite");
        expect(getGameLabel(makeGame({ status: "draw" }))).toBe("Match nul");
    });
});
