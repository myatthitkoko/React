import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { FormProvider } from './FormProvider'
import FormBefore from './FormBefore'
import styles from './styles.module.css'

const seats = [ "12", "11", "10", "9", "8", "7", "6", "5"];

const hangingSpiderLink = "https://custom-doodle.com/wp-content/uploads/doodle/marvel-spider-man-hanging-upside-down/marvel-spider-man-hanging-upside-down-doodle.gif"


function App() {

  const [selectedSeats, setSelectedSeats] = useState([]);

  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={hangingSpiderLink} className="base" width="170" height="179" alt="" />
        </div>
        <div className="title">
          <h1>SPIDER-MAN</h1>
          <h2>BRAND NEW DAY</h2>
          <h3>8 tickets have been purchased.</h3>
          <h3>Reserve your seat in the theatre</h3>
        </div>
    </section>
        <img src="seating.png"/>
    <section id="center">
        <h3>Showtime Info</h3>
        <ul>
            <li>AMC Puente Hills 20</li>
            <li>Wednesday, August 19, 2026</li>
            <li>6:00 pm</li>
            <li>2 HR 24 MIN</li>
            <li>PG13 | 
            RealD 3D | 
            AMC Signature Recliners | 
            Laser at AMC</li>
        </ul>
        <div className="boxes">
            {seats.map((seat) => (
              <div className="container">
                <p>G{seat}</p>
                <input 
                  type="radio" 
                  key={seat}
                  value={seat}
                  name="seating"
                  value={seat}
                  checked={setSelectedSeats({seat})}
                />
                <p className='placeholder'></p>
              </div>
            ))}
        </div>
      </section>

      <section id="next-steps">
        <div id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
                            <div className={styles.form}>
                      <FormProvider>
                          <div className={styles.formContent}>
                              <FormBefore 
                                selectedSeats = {1}
                              />
                          </div>
                      </FormProvider>
                  </div>
        </div>
        <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>Learn More About Me</h2>
          <p>Stay tuned to the latest updates</p>
          <ul>
            <li>
              <a href="https://github.com/myatthitkoko" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/not_ur_myat_thit/" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#instagram-icon"></use>
                </svg>
                Instagram
              </a>
            </li>
          </ul>
          <div className='img-container'>
                    <img src="https://th.bing.com/th/id/R.fbc13f1d0386dd14b4a3999e33e2448c?rik=cpWN9s8Qqi2TDA&riu=http%3a%2f%2fclipart-library.com%2fimages_k%2fsilhouette-of-city-skyline%2fsilhouette-of-city-skyline-3.png&ehk=em1Ikh%2bLydxPYyJDyEsKshZse0D%2fz7EYtlQPiUyuWQo%3d&risl=&pid=ImgRaw&r=0"/>
                  </div>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App