import style from "./css/Features.module.css";

export default function Features() {
    const features = [
        {
            icon: "bi bi-emoji-smile-fill",
            bg: style.purple,
            titre: "Amusant & accessible",
            text: "Des jeux simples à comprendre pour tous les âges."
        },
        {
            icon: "bi bi-people-fill",
            bg: style.blue,
            titre: "Joue avec tes amis",
            text: "Invite tes amis ou défie des joueurs du monde entier."
        },
        {
            icon: "bi bi-trophy-fill",
            bg: style.orange,
            titre: "Progresse & gagne",
            text: "Grimpe dans les classements et remporte des badges."
        },
        {
            icon: "bi bi-shield-fill-check",
            bg: style.green,
            titre: "Sûr & équitable",
            text: "Un environnement sécurisé et un jeu 100% fair-play."
        },
    ];

    return (
        <div className="container bg-body rounded-4 mt-4 mb-5 py-4">
            <div className="row g-4">
                {features.map((card, index) => (
                    <div key={card.titre} className={`col-6 col-lg-3 d-flex flex-column align-items-center text-center px-3 ${index !== features.length - 1 ? style.borderItem : ""}`}>
                        <div className={`${style.featureIcon} ${card.bg} rounded-circle d-flex justify-content-center align-items-center`}>
                            <i className={card.icon} aria-hidden="true"></i>
                        </div>
                        <h4 className="mt-3">{card.titre}</h4>
                        <p>{card.text}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
