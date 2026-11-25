export interface NavLink {
    label: string;
    to: string;
    icon: string,
}

export const navLinks: NavLink[] = [
    { label: "Accueil", to: "/", icon: "bi bi-house" },
    { label: "Jeux", to: "/jeux", icon: "bi bi-controller" },
];
