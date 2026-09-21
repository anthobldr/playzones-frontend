export default function TrophyClassement(){
    const users = [
        {name: "Aurele", score: "4 250"},
        {name: "Lucas", score: "3 890"},
        {name: "Toi (usertest)", score: "2 450"},
        {name: "Sarah", score: "2 210"},
        {name: "Nelly", score: "1 980"}
    ]
    return (
        <div className="bg-white shadow-sm rounded-4 py-3">
            <div className="d-flex justify-content-between align-items-center px-4">
                <h2>Classement</h2>
                <a href="#" className="text-decoration-none">Voir le classement</a>
            </div>
            <ul className="list-unstyled d-flex flex-column gap-3 px-5 my-3">
                {users.map((user, index) =>(
                    <li key={index} className="d-flex justify-content-between">
                        <span className="fw-bold">{user.name}</span>
                        <span>{user.score}<i className="bi bi-trophy-fill text-warning fs-5 ms-2"></i></span>
                    </li>
                ))}
            </ul>
        </div>
    )
}