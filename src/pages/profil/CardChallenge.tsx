import style from "./css/CardChallenge.module.css"
interface CardChallengesProps{icon:string;name:string;desc:string;value:string;progress:number;color:string;}

export default function CardChallanges({icon, name, desc, value, progress, color}: CardChallengesProps){
    return (
        <article className="bg-white rounded-5 px-4 py-3 mx-2">
            <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex gap-3 align-items-center">
                    <div>
                        <i className={`${icon} fs-2`} style={{ color }}></i>
                    </div>
                    <div className="d-flex flex-column">
                        <span className="fw-bold">{name}</span>
                        <small className="text-secondary">{desc}</small>
                    </div>
                </div>
                <h5>{value}</h5>
            </div>
            <div className={`${style.progressTrack} rounded-5 mt-3`}>
                <div className={`${style.progressFill} rounded-5`} style={{ width: `${progress}%`, backgroundColor: color }}></div>
            </div>
        </article>
    )
}