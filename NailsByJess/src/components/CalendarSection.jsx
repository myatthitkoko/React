import styles from '../styleSheets/Booking.module.css'
import Calendar from 'react-calendar';
import FormBefore from "../components/FormBefore";
import { FormProvider } from "../components/FormProvider";
import { useRef } from 'react';
import { useEffect, useState } from "react";

export default function CalendarSection() {
  const [date, setDate] = useState(new Date());
  const [slot, setSlot] = useState("");
  const [openForm, setOpenForm] = useState(false);
  const dateSectionRef = useRef(null);
  const timeSectionRef = useRef(null);
  const today = new Date();
  today.setHours(0,0,0,0);
  const selected = date.toLocaleDateString("en-CA")

  const aWeekInAdvance = (slots) => {
    const sixDaysLater = new Date(today);
    sixDaysLater.setHours(0,0,0,0);
    sixDaysLater.setDate(today.getDate() + 6);

    if (date <= sixDaysLater) {
        return [];
    }

    return slots;
  };


  const [availability, setAvailability] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    setAvailability(null);
    setError("");
    
    fetch(`/api/availability/${selected}`)
    .then((res) => res.json())
    .then((data) => setAvailability(aWeekInAdvance(data)))
    .catch(() => setError("Unable to load availability."));
  }, [selected]);

  return (
    <>
        {openForm ? 
            <div className={`${styles.formWrapper} ${
    openForm ? styles.open : styles.closed
  }`}>
                <button className={styles.exit} onClick={() => setOpenForm(false)}><img src='doubleDownSign.svg'/></button>
                <div className={styles.form}>
                    <FormProvider>
                        <div className={styles.message}>
                            <h2>You are making an appointment for {date.toDateString()} at {new Date(slot).toLocaleTimeString("en-CA", {timeZone: "America/Los_Angeles", hour: "numeric", minute: "2-digit"})}</h2>
                            <div><p>Need to make a change?</p><button type="button" className={styles.messageExit} onClick={() => setOpenForm(false)}>Return to Time Slot</button></div>
                        </div>
                        <div className={styles.formContent}>
                            <FormBefore 
                            selected = {selected}
                            slot = {slot}
                            />
                            <p>After clicking the button, the page will be redirected to a third party payment system where you could make a $20 deposit to complete your reservation.</p>
                        </div>
                    </FormProvider>
                </div>
            </div>
        :
        <div className={styles.content}>
            <h2 className={styles.title}>Get started by selecting a date</h2>
            <p className="smaller title">Book at least a week in advance</p>
            <Calendar 
                minDetail="month"
                maxDetail="month"
                prev2Label={null}
                next2Label={null}
                tileDisabled={({ date, view}) =>
                view === "month" && date < today }
                tileClassName={({ date, view}) =>
                view === "month" && date < today ? "past" : null}
                calendarType="gregory"
                onChange={(newDate) => {
                    setDate(newDate);
                    setSlot("");
                    dateSectionRef.current?.scrollIntoView({
                    behavior: "smooth"
                    });
                }} 
                value={date} 
            />
        <p className={styles.dateSelected}>
            <span className="bold">Selected Date:</span>{' '}
            {date.toDateString()}
        </p>
        {!availability ? 
        <div className={styles.noSlots} ref={dateSectionRef}>
            {error ? <h2>{error}</h2>
            :
            <>
                <h2>Loading slots...</h2>
                <img src="https://media.tenor.com/G7LfW0O5qb8AAAAi/loading-gif.gif" alt="loading gif" />
            </>
            }
        </div> 
        :
        availability.length > 0 ? 
            <div className={styles.yesSlots} id='dateSelected'>
                <h2>Available Time Slots</h2> 
                <p>Please select a time slot to continue</p>
                {availability.map((timeObject) => (
                    <div className='timeSlots' key={timeObject.value}>
                        <label>
                            <input 
                            type='radio' 
                            name='time' 
                            id={timeObject.display} 
                            value={timeObject.value} 
                            checked = {slot === timeObject.value}
                            onChange={(e) => {
                                setSlot(timeObject.value);
                                timeSectionRef.current?.scrollIntoView({
                                behavior: "smooth"
                                });
                            }}
                            />
                            {timeObject.display}
                        </label>
                    </div>
                ))}
                <button 
                    disabled={!slot} 
                    className={styles.slotButton} 
                    onClick={() => {
                        setOpenForm(true);
                        window.scrollTo({
                        top: 0,
                        behavior: "smooth",
                        });
                    }} 
                    ref={timeSectionRef}
                >
                    Confirm Date & Time
                </button>
            </div>
            : 
            <div className={styles.noSlots} ref={dateSectionRef}>
                <h2>No Slots For This Date</h2>
                <p>Try selecting another date to find availabile time slots</p>
            </div>}
        </div> }
    </>
  );
}