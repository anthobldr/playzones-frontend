const COLORS = ["#dc3545", "#dc3545", "#fd7e14", "#ffc107", "#198754"];
const LABELS = ["", "Faible", "Moyenne", "Bonne", "Excellente"];

interface PasswordStrengthBarProps {
    score: number; // Score de sécurité de 1 à 4
}

export default function PasswordStrengthBar({ score }: PasswordStrengthBarProps) {
    const color = COLORS[score];

    return (
        <div className="d-flex align-items-center gap-2">
            <div className="d-flex gap-1">
                {[0, 1, 2, 3].map((i) => (
                    <span key={i} style={{width: "28px", height: "6px", borderRadius: "4px", backgroundColor: i < score ? color : "#e9ecef", transition: "background-color 0.3s ease",}} />
                ))}
            </div>
            <small>Sécurité : <span style={{ color, fontWeight: 600 }}>{LABELS[score]}</span></small>
        </div>
    );
}