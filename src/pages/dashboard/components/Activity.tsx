export default function Activity(){
    return (
        <div className="bg-white shadow-sm rounded-4 py-4 px-4">
            <div className="d-flex justify-content-between">
                <h2>Ton activité cette semaine</h2>
                <select defaultValue="7j" className="form-select w-25" aria-label="Choix de l'activité">
                    <option value="7j">7 derniers jours</option>
                    <option value="1">Ce mois ci</option>
                </select>
            </div>
        </div>
    )
}