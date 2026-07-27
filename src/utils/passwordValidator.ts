export interface PasswordValidation {
    isValid: boolean;
    minLength: boolean;
    upperCase: boolean;
    number: boolean;
    specialChar: boolean;
    score: number;
}
// Vérifie que le mot de passe contient 8 caractères, 1 majuscule, 1 nombre et un caractère spécial

export default function checkPassword(password: string): PasswordValidation {
    const minLength = password.length >= 8;
    const upperCase = /[A-Z]/.test(password);
    const number = /[0-9]/.test(password);
    const specialChar = /[^A-Za-z0-9]/.test(password);

    const score = [minLength, upperCase, number, specialChar].filter(Boolean).length;

    return { isValid: score === 4, minLength, upperCase, number, specialChar, score, };
}

// Vérifie que les deux champs de mot de passe soit les mêmes
export function passwordsMatch(password: string, confirmPassword: string): boolean {
    return password.length > 0 && password === confirmPassword;
}