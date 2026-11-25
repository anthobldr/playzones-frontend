import { Link } from "react-router-dom";
import LegalLayout from "./LegalLayout";

export default function Cgu() {
    return (
        <LegalLayout title="Conditions d'utilisation" updatedAt="[JJ/MM/AAAA]">
            <h2 className="h4 mt-4">1. Objet</h2>
            <p>
                Les présentes conditions encadrent l'utilisation de PlayZones, une plateforme gratuite de jeux de société en ligne.
                En créant un compte, tu acceptes ces conditions.
            </p>

            <h2 className="h4 mt-4">2. Création du compte</h2>
            <p>
                L'inscription nécessite une adresse e-mail valide, que tu confirmes grâce à un code.
                Tu es responsable de la confidentialité de ton mot de passe.
            </p>

            <h2 className="h4 mt-4">3. Comportement</h2>
            <p>
                Tu t'engages à rester respectueux envers les autres joueurs. Sont interdits notamment : les propos injurieux,
                discriminatoires ou haineux, le harcèlement, et l'usurpation d'identité, y compris dans les pseudos et les messages.
                Un compte qui ne respecte pas ces règles peut être suspendu ou supprimé.
            </p>

            <h2 className="h4 mt-4">4. Disponibilité du service</h2>
            <p>
                PlayZones est un projet de formation : le service est fourni tel quel, sans garantie de disponibilité permanente.
            </p>

            <h2 className="h4 mt-4">5. Données personnelles</h2>
            <p>
                Le traitement de tes données est décrit dans la <Link to="/confidentialite">politique de confidentialité</Link>.
                Tu peux supprimer ton compte à tout moment depuis ton profil.
            </p>

            <h2 className="h4 mt-4">6. Modification des conditions</h2>
            <p>Ces conditions peuvent évoluer. La date de dernière mise à jour figure en haut de cette page.</p>

            <h2 className="h4 mt-4">7. Droit applicable</h2>
            <p>Les présentes conditions sont soumises au droit français.</p>
        </LegalLayout>
    );
}
