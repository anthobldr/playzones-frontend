import style from "./Layout.module.css";
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
                <div className="row align-items-center h-100">
                    <div className="col-lg-6">
                        <h1 className={style.title}>
                            {title}
                            {titleAccent && (
                                <>
                                    <br />
                                    <span className={style.titleAccent}>{titleAccent}</span>
                                </>
                            )}
                        </h1>
                        <div className={`${style.text} mt-4`}>{text}</div>

                        {children && <div className="mt-5">{children}</div>}
                    </div>
                </div>
            </div>
            <div className={`${style.heroVisual} d-none d-lg-flex position-absolute top-0 end-0 h-100 justify-content-center align-items-center`}>
                <img src={imageSrc} alt={imageAlt} className={`${style.heroImg} mw-100`} />
            </div>
        </section>
    );
}