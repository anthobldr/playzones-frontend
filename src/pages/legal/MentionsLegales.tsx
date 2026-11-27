import { Link } from "react-router-dom";
import LegalLayout from "./LegalLayout";

export default function MentionsLegales() {
    return (
        <LegalLayout title="Mentions légales" updatedAt="25/11/2016">
            <h2 className="h4 mt-4">Éditeur du site</h2>
            <p>
                PlayZones est un projet réalisé dans le cadre de la formation Développeur web et web mobile.<br />
                Éditeur: Anthony Lutard<br />
                Contact: anthony.lutard33@gmail.com
            </p>

            <h2 className="h4 mt-4">Directeur de la publication</h2>
            <p>Anthony Lutard</p>

            <h2 className="h4 mt-4">Hébergement</h2>
            <p>O2switch, Chem. des Pardiaux, 63000 Clermont-Ferrand, France 04 44 44 60 40</p>

            <h2 className="h4 mt-4">Propriété intellectuelle</h2>
            <p>
                Les avatars sont générés avec <a href="https://www.dicebear.com/licenses/" target="_blank" rel="noopener noreferrer">DiceBear</a> :
                chaque style d'avatar est soumis à sa propre licence.
                Les icônes proviennent de Bootstrap Icons (licence MIT) et la police Poppins est distribuée sous licence SIL Open Font.
            </p>

            <h2 className="h4 mt-4">Données personnelles</h2>
            <p>
                Le traitement de tes données est décrit dans la <Link to="/confidentialite">politique de confidentialité</Link>.
            </p>
        </LegalLayout>
    );
}
