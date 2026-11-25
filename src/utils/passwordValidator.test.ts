import { describe, expect, it } from "vitest";
import checkPassword, { passwordsMatch } from "./passwordValidator";

describe("checkPassword", () => {
    it("accepte un mot de passe qui respecte toutes les règles", () => {
        const result = checkPassword("Passw0rd!");

        expect(result.isValid).toBe(true);
        expect(result.score).toBe(4);
    });

    it.each([
        ["trop court", "Pa0!", "minLength"],
        ["sans majuscule", "passw0rd!", "upperCase"],
        ["sans chiffre", "Password!", "number"],
        ["sans caractère spécial", "Passw0rd", "specialChar"],
    ] as const)("refuse un mot de passe %s", (_label, password, failedRule) => {
        const result = checkPassword(password);

        expect(result.isValid).toBe(false);
        expect(result[failedRule]).toBe(false);
        expect(result.score).toBe(3);
    });

    it("donne un score de 0 à une chaîne vide", () => {
        expect(checkPassword("").score).toBe(0);
    });
});

describe("passwordsMatch", () => {
    it("renvoie true si les deux mots de passe sont identiques", () => {
        expect(passwordsMatch("Passw0rd!", "Passw0rd!")).toBe(true);
    });

    it("renvoie false si les mots de passe sont différents", () => {
        expect(passwordsMatch("Passw0rd!", "Passw0rd?")).toBe(false);
    });

    it("renvoie false si les deux champs sont vides", () => {
        expect(passwordsMatch("", "")).toBe(false);
    });
});