import { Link, useLocation } from "react-router-dom";

const pages = ["/", "/services", "/booking"];

export default function Header() {
    const location = useLocation();
    const currentPage = location.pathname;
    const sanityCheck = pages.includes(currentPage)
    if (!sanityCheck) return null;

    return (
        <>
            <header>
                <Link to='/'><h1>Jess's Nails<span className="smaller">Home Based | San Pedro, CA</span></h1></Link>
            </header>
        </>
    )
}