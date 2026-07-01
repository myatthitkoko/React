import { Link } from "react-router-dom";

export default function Header() {
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
                {/*<div className="jump">
                    <h4>
                    <a href="#featured">Featured Projects</a>
                    </h4>
                    <h4>
                    <a href="#blogs">Blogs</a>
                    </h4>
                    <h4>
                    <a href="#labs">Labs</a>
                    </h4>
                </div>*/}
                </header>
            </div>
        </>
    )
}