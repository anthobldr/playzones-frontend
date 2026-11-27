import { Link } from "react-router-dom";
import LegalLayout from "./LegalLayout";

const treatments = [
    { data: "Adresse e-mail", purpose: "Création du compte, connexion, envoi des codes de vérification et des liens de réinitialisation", duration: "Jusqu'à la suppression du compte" },
    { data: "Pseudo", purpose: "Identification auprès des autres joueurs", duration: "Jusqu'à la suppression du compte" },
    { data: "Mot de passe (haché, jamais stocké en clair)", purpose: "Authentification", duration: "Jusqu'à la suppression du compte" },
    { data: "Avatar (style, identifiant, couleur)", purpose: "Personnalisation du profil", duration: "Jusqu'à la suppression du compte" },
    { data: "Amis et messages", purpose: "Fonctionnalités sociales du service", duration: "Jusqu'à la suppression du compte" },
    { data: "Code de vérification de l'e-mail", purpose: "Confirmer que l'adresse t'appartient", duration: "15 minutes, supprimé dès son utilisation" },
    { data: "Lien de réinitialisation du mot de passe", purpose: "Récupération du compte", duration: "1 heure, utilisable une seule fois" },
    { data: "Adresse IP et identifiant de connexion", purpose: "Limitation des tentatives de connexion (sécurité)", duration: "15 minutes" },
];

export default function Confidentialite() {
    return (
        <LegalLayout title="Politique de confidentialité" updatedAt="25/11/2016">
            <p>
                Cette page explique quelles données PlayZones collecte, pourquoi, combien de temps elles sont conservées
                et comment exercer tes droits, conformément au Règlement général sur la protection des données (RGPD).
            </p>

            <h2 className="h4 mt-4">Responsable du traitement</h2>
            <p>Anthony Lutard — anthony.lutard@gmail.com</p>

            <h2 className="h4 mt-4">Données collectées</h2>
            <p>
                PlayZones ne collecte que les données nécessaires au fonctionnement du service.
                La base légale de ces traitements est l'<strong>exécution du contrat</strong> que tu acceptes en créant ton compte
                (les conditions d'utilisation).
            </p>
            <div className="table-responsive">
                <table className="table">
                    <caption>Données traitées par PlayZones</caption>
                    <thead>
                        <tr>
                            <th scope="col">Donnée</th>
                            <th scope="col">Finalité</th>
                            <th scope="col">Durée de conservation</th>
                        </tr>
                    </thead>
                    <tbody>
                        {treatments.map((row) => (
                            <tr key={row.data}>
                                <td>{row.data}</td>
                                <td>{row.purpose}</td>
                                <td>{row.duration}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <h2 className="h4 mt-4">Destinataires</h2>
            <ul>
                <li>
                    <strong>Resend</strong>, prestataire d'envoi d'e-mails : reçoit ton adresse e-mail et ton pseudo
                    pour t'envoyer les codes de vérification et les liens de réinitialisation.
                    Les données sont hébergées sur un serveur situé dans l'Union européenne. Aucune donnée n'est transférée hors de l'Union européenne.
                </li>
                <li>
                    <strong>DiceBear</strong>, service de génération d'avatars : ton navigateur lui envoie ton adresse IP
                    lorsqu'il affiche un avatar.
                </li>
            </ul>
            <p>Tes données ne sont jamais vendues ni utilisées à des fins publicitaires.</p>

            <h2 className="h4 mt-4">Cookies</h2>
            <p>
                PlayZones utilise un seul cookie : le <strong>cookie de session</strong>, qui te garde connecté.
                Il est strictement nécessaire au fonctionnement du service et il est supprimé à la déconnexion.
                Aucun cookie de mesure d'audience ou de publicité n'est utilisé : c'est pourquoi aucun bandeau de consentement n'est affiché.
            </p>

            <h2 className="h4 mt-4">Sécurité</h2>
            <p>
                Les mots de passe sont hachés, les échanges sont chiffrés (HTTPS), les liens de réinitialisation sont stockés sous forme hachée,
                et les tentatives de connexion sont limitées.
            </p>

            <h2 className="h4 mt-4">Tes droits</h2>
            <p>
                Tu disposes d'un droit d'accès, de rectification, d'effacement, de limitation, d'opposition et de portabilité de tes données.
            </p>
            <ul>
                <li>Tu peux <strong>supprimer ton compte</strong> à tout moment depuis la page <Link to="/account/profil">Profil</Link> : toutes tes données sont alors effacées.</li>
                <li>Pour toute autre demande, écris à [adresse e-mail de contact].</li>
            </ul>
            <p>
                Si tu estimes que tes droits ne sont pas respectés, tu peux adresser une réclamation à la{" "}
                <a href="https://www.cnil.fr/fr/plaintes" target="_blank" rel="noopener noreferrer">CNIL</a>.
            </p>
        </LegalLayout>
    );
}
