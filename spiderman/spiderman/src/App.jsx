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
const slots = [
  { id: 101, date: "2026-08-19", time: "18:00" },
  { id: 102, date: "2026-08-19", time: "20:00" },
];

const hangingSpiderLink = "https://custom-doodle.com/wp-content/uploads/doodle/marvel-spider-man-hanging-upside-down/marvel-spider-man-hanging-upside-down-doodle.gif"


function App() {

  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={hangingSpiderLink} className="base" width="170" height="179" alt="" />
        </div>
        <div>
          <h1>Spider-Man</h1>
          <h2 class="red">Brand New Day</h2>
          <h3>In Theatres July 31st</h3>
          <p>
            Please select all available time
          </p>
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
          {times.map(time => (
            dates.filter(date => date != "").map((date) => (
              <input type="checkbox" value={`${date}-${time}`}/>
            ))
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
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App
