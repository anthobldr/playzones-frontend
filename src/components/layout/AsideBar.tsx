import { Link, useLocation } from "react-router-dom"
import { items } from "../../data/dashboardNavLinks";
import style from "./css/AsideBar.module.css"

export default function AsideBar(){
    const location = useLocation();
    const pathname = location.pathname;
    return (
        <aside className="d-none d-lg-flex flex-column bg-white h-100">
            <div className="d-flex align-items-center my-3">
                <Link to="/">
                    <img src="/logo.png" alt="Logo PlayZone" width="150" className="ms-4" />
                </Link>
            </div>
            <ul className="d-flex flex-column gap-3 list-unstyled mx-3 my-4">
                {
                    items.map((item,index) => (
                        <li className={`d-flex align-items-center rounded-3 px-3 py-1 ${pathname === item.to ? "bg-primary" : ""}`} key={index}>
                            <i className={`${item.icon} menu-icon me-3 ${pathname === item.to ? "text-white" : ""}`}></i>
                            <Link className={`text-decoration-none ${pathname === item.to ? "text-white" : ""}`} to={item.to}>{item.label}</Link>
                        </li>
                    ))
                }
            </ul>
        </aside>
    )
}