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
                        <a href="/">Home</a>
                        </li>
                        <li>
                        <a href="/books/">Books</a>
                        </li>
                        <li>
                        <a href="/projects/">Projects</a>
                        </li>
                        <li>
                        <a href="/about/">About</a>
                        </li>
                        <li>
                        <a href="/contact/">Contact</a>
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