import type { ReactNode } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

interface LegalLayoutProps {
    title: string;
    updatedAt: string;
    children: ReactNode;
}

export default function LegalLayout({ title, updatedAt, children }: LegalLayoutProps) {
    return (
        <>
            <header>
                <Navbar />
            </header>
            <main className="container my-5">
                <article className="bg-white rounded-4 shadow-sm p-4 p-lg-5 mx-auto" style={{ maxWidth: "900px" }}>
                    <h1>{title}</h1>
                    <p className="text-secondary">Dernière mise à jour: {updatedAt}</p>
                    {children}
                </article>
            </main>
            <Footer />
        </>
    );
}