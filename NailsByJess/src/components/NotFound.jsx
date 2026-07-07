import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div className="NotFound">
            <h1>404 PAGE NOT FOUND</h1>
            <p>The page you are looking for does not exist.</p>
            <br/>
            <Link to="/" className="blueLink">Go to home page</Link>
        </div>
    )
}