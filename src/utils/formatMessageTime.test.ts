import { describe, expect, it } from "vitest";
import { formatMessageTime } from "./formatMessageTime";

describe("formatMessageTime", () => {
    const now = new Date(2026, 10, 26, 18, 0);

    it("affiche seulement l'heure pour un message du jour", () => {
        expect(formatMessageTime(new Date(2026, 10, 26, 9, 5).toISOString(), now)).toBe("09:05");
    });

    it("ajoute la date pour un message plus ancien", () => {
        expect(formatMessageTime(new Date(2026, 10, 25, 14, 32).toISOString(), now)).toBe("25/11 14:32");
    });
});
