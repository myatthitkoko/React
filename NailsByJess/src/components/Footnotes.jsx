import { Link, useLocation } from "react-router-dom";

const pages = ["/", "/services", "/booking"];

export default function Header() {
    const location = useLocation();
    const currentPage = location.pathname;
    const sanityCheck = pages.includes(currentPage)
    if (!sanityCheck) return null;

    return (
        <>
            <div className="pattern"></div>
            <footer>
                <h2>Nails By Jess</h2>
                <div className="footer-group">
                    <div className="columns">
                        <div className="column">
                            <h4>Site Index</h4>
                            <ul>
                                <li><Link to='/'>Home</Link></li>
                                <li><Link to='/services'>Services</Link></li>
                                <li><Link to='/booking'>Booking</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4>Resources</h4>
                            <ul>
                                <li><Link to='/services'>Pricelist</Link></li>
                                <li><Link to='/booking'>Calendar</Link></li>
                                <li><Link to='/privacy-policy'>Privacy Policy</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div>
                        <h2>Get In Touch</h2>
                        <p><a href="mailto:jesseniasnailss@gmail.com">jesseniasnailss@gmail.com</a></p>
                        <p>Instagram: <a href="https://www.instagram.com/jesseniasnailss/">@jesseniasnailss</a></p>
                    </div>
                </div>
            </footer>
        </>
    )
}