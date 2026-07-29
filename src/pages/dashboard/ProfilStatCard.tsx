import style from "./css/ProfilStatCard.module.css";

interface ProfilStatCardProps {icon: string; colorClass: string; label: string; value: string;}

export default function ProfilStatCard({ icon, colorClass, label, value }: ProfilStatCardProps) {
    return (
        <div className={`d-flex align-items-center gap-3 bg-white rounded-4 shadow-sm px-4 py-3`}>
            <div className={`${style.statIcon} ${colorClass} rounded-circle d-flex justify-content-center align-items-center text-white flex-shrink-0`}>
                <i className={icon} aria-hidden="true"></i>
            </div>
            <div>
                <small className="text-muted">{label}</small>
                <p className={`statValue mb-0 fw-bold`}>{value}</p>
            </div>
        </div>
    );
}
