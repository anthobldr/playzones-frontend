import style from "./css/Hero.module.css";
import { ReactNode } from "react";

interface HeroProps {
    title: string;
    titleAccent?: string;
    text: ReactNode;
    imageSrc: string;
    imageAlt: string;   
    children?: ReactNode;
}

export default function Hero({ title, titleAccent, text, imageSrc, imageAlt, children }: HeroProps) {
    return (
        <section className={`${style.hero} position-relative overflow-hidden`}>
            <div className="container h-100">
                <div className="row h-100">
                    <div className={`col-12 col-lg-6 ${style.heroContent}`}>
                        <h1 className="text-start">
                            {title}
                            {titleAccent && (
                                <>
                                    <br />
                                    <span className={style.titleAccent}>{titleAccent}</span>
                                </>
                            )}
                        </h1>
                        <div className={`${style.text} d-none d-lg-block text-start mt-4`}>{text}</div>
                        <div className="row d-lg-none">
                            <div className="col-7">
                                <div className={`${style.text} text-start mt-4`}>{text}</div>
                            </div>
                        </div>
                        {children && <div className="mt-5">{children}</div>}
                    </div>
                </div>
            </div>
            <div className={`d-lg-flex position-absolute top-0 end-0 h-100 align-items-center ${style.heroVisual}`}>
                <img src={imageSrc} alt={imageAlt} className={`${style.heroImg}`} />
            </div>
        </section>
    );
}
