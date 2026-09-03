export interface NavLink {
    label: string;
    to: string;
}

export const navLinks: NavLink[] = [
    { label: "Accueil", to: "/" },
    { label: "Jeux", to: "/jeux" },
    { label: "Classements", to: "#" },
    { label: "Défis", to: "#" },
    { label: "À propos", to: "#" },
];
