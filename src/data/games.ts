export interface Game {
    img: string;
    name: string;
    desc: string;
}

export const games: Game[] = [
    { img: "/games/tictactoe.png", name: "Tic Tac Toe", desc: "Le classique indémodable !" },
    { img: "/games/dames.png", name: "Dames", desc: "Stratégie et réflexion" },
    { img: "/games/puissance4.png", name: "Puissance 4", desc: "Aligne 4 et gagne !" },
    { img: "/games/backgammon.png", name: "Backgammon", desc: "Chance et stratégie réunies" },
    { img: "/games/echecs.png", name: "Échecs", desc: "Maitrise le roi !" },
];
