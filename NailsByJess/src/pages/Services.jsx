import styles from '../styleSheets/Services.module.css'
import InstagramEmbed from '../components/InstagramEmbed.jsx'
import { Link } from "react-router-dom";

const featured = [
    "featured1.png", "featured2.png", "featured3.png"
]

const pressed = [
    "press1.png", "press2.png", "press3.png"
]

const categories = [
    "Acrylic, Gel X Services", "Manicure Services", "Add ons", "Fullset", "Extras"
]

const Acrylic = [
  { type: "Short Length", price: 55, currency: "$"},
  { type: "Medium Length", price: 65, currency: "$" },
  { type: "Long Length", price: 75, currency: "$" },
  { type: "X Long Length", price: 85, currency: "$" },
  { type: "XX Long Length", price: 95, currency: "$" }
];

const Manicure = [
  { type: "Get Manicure", price: 45, currency: "$" },
  { type: "Extension on Single Nail", price: 3, currency: "$" }
];

const AddOns = [
    { type: "Stickers", price: 3, sign: "+", currency: "$" },
    { type: "Rhinestones", price: 3, sign: "+", currency: "$" },
    { type: "Custom Gel Design", price: 4, sign: "+", currency: "$" },
    { type: "Encapsulation", price: 4, sign: "+", currency: "$" },
    { type: "Swarovski Crystals", sign: "TBD" },
    { type: "3D Design", price: 3, sign: "+", currency: "$" },
    { type: "Isolated Chrome", price: 3, sign: "+", currency: "$" }
];

const Fullset = [
    { type: "French Tip", price: 20, currency: "$" },
    { type: "Cat Eye French Tip", price: 40, currency: "$" },
    { type: "Ombre", price: 25, currency: "$" },
    { type: "Chrome", price: 25, currency: "$" },
];

const Extras = [
    { type: "Nail Repair", price: 5, currency: "$" },
    { type: "Soak Off", price: 20, currency: "$" },
    { type: "Nail Fills", sign: "Unavailable" },
];

const listMap = {
    "Acrylic, Gel X Services": Acrylic,
    "Manicure Services": Manicure,
    "Add ons": AddOns,
    "Fullset": Fullset,
    "Extras": Extras
};


export default function Services() {
    return (
        <div className={styles.main}>
            <div className={styles.content}>
                <h2 className="title">Pricelist</h2>
                <ul className={styles.blocks}>
                    {categories.map((title) => (
                        <li className={styles.block}>
                            <h2 className={styles.title}>{title}</h2>
                            <hr/>
                            <ul>
                                {listMap[title].map((service) => (
                                    <li className={styles.price}>{service.type}<span>{service.currency}{service.price}{service.sign}</span></li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
                <Link to="/booking" className={`${styles.bookNow} primary`}>Schedule an Appointment</Link>

                <h2 className="title">Featured Works</h2>
                <div className={styles.posts}>
                    {featured.map((photo) => (
                            <img key={photo} src={photo} />
                    ))}
                </div>
                <h2 className="title">Press Ons</h2>
                <div className={styles.posts}>
                    {pressed.map((photo) => (
                            <img key={photo} src={photo} />
                    ))}
                </div>
                <h2 className="title">Follow My Instagram Gallery</h2>
                <div className={styles.posts}>
                    <InstagramEmbed URL="https://www.instagram.com/p/DFqDiHfvO5i/?img_index=3"/>
                    <InstagramEmbed URL="https://www.instagram.com/p/DaQS34BFKeO/"/>
                    <InstagramEmbed URL="https://www.instagram.com/p/DaTcJVbkqCo/"/>
                    <InstagramEmbed URL="https://www.instagram.com/p/DY4-t-1mstp/"/>
                    <InstagramEmbed URL="https://www.instagram.com/p/DZvMohcGdxZ/"/>
                </div>
            </div>
        </div>
    )
}