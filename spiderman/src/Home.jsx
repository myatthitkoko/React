import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { FormProvider } from './FormProvider'
import FormBefore from './FormBefore'
import styles from './styles.module.css'

const days = [ "", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const dates = [ "", "16", "17", "18", "19", "20", "21", "22"];
const times = ["14:00", "16:00", "18:00", "20:00", "22:00"];

const hangingSpiderLink = "https://custom-doodle.com/wp-content/uploads/doodle/marvel-spider-man-hanging-upside-down/marvel-spider-man-hanging-upside-down-doodle.gif"


function App() {
  const [selectedTimes, setSelectedTimes] = useState([]);

  const handleTimeChange = (date, time) => {
    const datetime = `2026-08-${date}T${time}:00`;
    //unchecking
    setSelectedTimes((current) => {
      if (current.includes(datetime)){
        return current.filter((item) => item !== datetime);
      }

      return [...current, datetime]
    });
  }

  console.log(selectedTimes);

  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={hangingSpiderLink} className="base" width="170" height="179" alt="" />
        </div>
        <div className="title">
          <h1>SPIDER-MAN</h1>
          <h2>BRAND NEW DAY</h2>
          <h3>In Theatres July 31st</h3>
          <div className="instructions">
            <p>
              Check all available times.
            </p>
            <a href="https://www.youtube.com/watch?v=orybDrUj4vA" target="_blank">How does this work?</a>
          </div>
        </div>

      </section>

      <div className="days">
        {days.map((day) => (
            <p className="day" key={day}>{day}</p>
        ))}
      </div>
      <div className="dates">
        <p className="date"></p>
        {dates.filter(date => date != "").map((date) => (
            <p className="date" key={date}>08/{date}</p>
        ))}
      </div>
      <div className="labels">
        <div className="times">
          {times.map((time) => (
            <p className="time" key={time}>{time}</p>
        ))}
        </div>
        <div className="boxes">
          {times.map((time, timeIndex) => (
            dates.filter(date => date != "").map((date, dateIndex) => {
              const datetime = `2026-08-${date}T${time}:00`;
              return (
                <input 
                  type="checkbox" 
                  key={`${date}-${time}`} 
                  value={datetime}
                  checked={selectedTimes.includes(datetime)}
                  onChange={() => handleTimeChange(date, time)}
                />
              );
            })
          ))}
        </div>
      </div>

      <section id="next-steps">
        <div id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
                            <div className={styles.form}>
                      <FormProvider>
                          <div className={styles.formContent}>
                              <FormBefore 
                                selectedTimes = {selectedTimes}
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