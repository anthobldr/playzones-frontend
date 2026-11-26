export interface DashboardLink {
    icon: string;
    label: string;
    to: string,
}

export const items: DashboardLink[] = [
    {icon: "bi bi-house", label: "Tableau de bord", to: "/account/dashboard"},
    {icon: "bi bi-controller", label: "Découvrir", to: "/decouvrir"},
    {icon: "bi bi-dice-3", label: "Mes jeux", to: "/account/games"},
    {icon: "bi bi-flag", label: "Défis", to: "/defis"},
    {icon: "bi bi-trophy", label: "Classements", to: "/scoreboard"},
    {icon: "bi bi-people", label: "Amis", to: "/account/friends"},
    {icon: "bi bi-chat-dots", label: "Messages", to: "/account/messages"},
    {icon: "bi bi-person", label: "Profil", to: "/account/profil"},
    {icon: "bi bi-gear", label: "Paramètres", to: "/settings"},
]