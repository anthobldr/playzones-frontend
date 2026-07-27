import style from "./css/Home.module.css";

interface StatCardProps {icon: string; colorClass: string; label: string; value: string;}

export default function StatCard({ icon, colorClass, label, value }: StatCardProps) {
    return (
        <div className={`${style.statCard} d-flex align-items-center gap-3 bg-white rounded-4 shadow-sm px-4 py-3`}>
            <div className={`${style.statIcon} ${colorClass} rounded-circle d-flex justify-content-center align-items-center text-white flex-shrink-0`}>
                <i className={icon} aria-hidden="true"></i>
            </div>
            <div>
                <small className="text-muted">{label}</small>
                <p className={`${style.statValue} mb-0 fw-bold`}>{value}</p>
            </div>
        </div>
    );
}
