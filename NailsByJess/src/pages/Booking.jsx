import styles from "../styleSheets/Booking.module.css"
import { useState } from 'react';
import Calendar from 'react-calendar';
import FormBefore from "../components/FormBefore";
import 'react-calendar/dist/Calendar.css'
import { FormProvider } from "../components/FormProvider";

const availability = {
  "2026-07-15": ["9:00 AM", "10:30 AM", "2:00 PM", "05:00 PM"],
  "2026-07-16": ["11:00 AM", "1:00 PM", "4:30 PM"],
  "2026-06-17": [],
};

function CalendarSection() {
  const [date, setDate] = useState(new Date());
  const [slot, setSlot] = useState("");
  const [openForm, setOpenForm] = useState(false);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const selected = date.toISOString().split("T")[0];

  return (
    <>
        {openForm ? 
            <div className={styles.formWrapper}>
                <button className={styles.exit} onClick={() => setOpenForm(false)}>Return to Time Slots ↓</button>
                <form className={styles.form}>
                    <FormProvider>
                        <div className={styles.message}>
                            <h2>You are making an appointment for {date.toDateString()} at {slot}</h2>
                        </div>
                        <FormBefore />
                        <p>After clicking the button, the page will be redirected to a third party payment system where you could make a deposit to complete your reservation.</p>
                    </FormProvider>
                </form>
            </div>
        : null
        }
        <div className={styles.content}>
            <h2 className={styles.title}>Get started by selecting a date</h2>
            <Calendar 
                minDetail="month"
                maxDetail="month"
                prev2Label={null}
                next2Label={null}
                tileDisabled={({ date, view}) =>
                view === "month" && date < today }
                tileClassName={({ date, view}) =>
                view === "month" && date < today ? "past tooltip" : null}
                tileContent={({ date, view}) =>
                view === "month" && date < today ? <span className="tooltiptext">Past dates cannot be selected</span> : null}
                calendarType="gregory"
                onChange={(newDate) => {setDate(newDate);setSlot("")}} 
                value={date} 
            />
        <p className={styles.dateSelected}>
            <span className="bold">Selected Date:</span>{' '}
            {date.toDateString()}
        </p>
        {availability[selected] ? 
            <div className={styles.yesSlots}>
                <h2>Available Time Slots</h2> 
                <p>Please select a time slot to continue</p>
                {availability[selected]?.map((time) => (
                    <div className='timeSlots' key={time}>
                        <label>
                            <input 
                            type='radio' 
                            name='time' 
                            id={time} 
                            value={time} 
                            checked = {slot === time}
                            onChange={(e) => setSlot(e.target.value)}
                            />
                            {time}
                        </label>
                    </div>
                ))}
                <button disabled={!slot} className={styles.button} onClick={() => setOpenForm(true)}>Confirm Date & Time</button>
            </div>
            : 
            <div className={styles.noSlots}>
                <h2>No Slots For This Date</h2>
                <p>Try selecting another date to find availabile time slots</p>
            </div>}
        </div>
    </>
  );
}

export default function Booking() {
    return (
        <>
            <CalendarSection />
        </>
    )
}