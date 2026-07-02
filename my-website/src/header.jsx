import { Link, useLocation } from "react-router-dom";

const pageJumps = [
    {
        page: "projects",
        jumps: ["Featured", "Blog", "Labs"]
    },
    {
        page: "",
        jumps: ["Books", "About", "Projects", "Contact"]
    }
]

function JumpSection() {
    const location = useLocation();
    const currentPage = location.pathname;
    const JumpsForPage = pageJumps.find(
        PageObj => "/" + PageObj.page === currentPage
    )

    return(
        <>
            {JumpsForPage?.jumps.map((sections, j) => (
                <h4><a href={"#" + sections} key={j}>{sections}</a></h4>
            ))}
        </>
    ) 
}

function HeaderContent() {
    return (
        <>
            <div className="header-wrapper">
                <header>
                <div className="container">
                    <input type="checkbox" id="nav-toggle" className="nav-toggle" />
                    <nav data-nosnippet="">
                    <ul>
                        <li>
                        <Link to="/">Home</Link>
                        </li>
                        <li>
                        <Link to="/books">Books</Link>
                        </li>
                        <li>
                        <Link to="/projects">Projects</Link>
                        </li>
                        <li>
                        <Link to="/about">About</Link>
                        </li>
                        <li>
                        <Link to="/contact">Contact</Link>
                        </li>
                    </ul>
                    </nav>
                    <label htmlFor="nav-toggle" className="nav-toggle-label">
                    <span>☰</span>
                    </label>
                </div>
                <a href="/" className="logo">
                    <h1>Myat Thit Ko Ko</h1>
                </a>
                <div className="jump">
                    <JumpSection />
                </div>
                </header>
            </div>
        </>
    )
}

export default function Header() {
    return (
        <>
            <HeaderContent />
        </>
    )
}