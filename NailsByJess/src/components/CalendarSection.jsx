import styles from '../styleSheets/Booking.module.css';
import BookingForm from '../components/BookingForm';
import DatePicker from '../components/DatePicker';
import TimeSlots from '../components/TimeSlots';
import { useRef } from 'react';
import { useEffect, useState } from "react";

function aWeekInAdvance (date, slots) {
    const today = new Date();
    today.setHours(0,0,0,0);
    const sixDaysLater = new Date(today);
    sixDaysLater.setHours(0,0,0,0);
    sixDaysLater.setDate(today.getDate() + 6);

    if (date <= sixDaysLater) {
        return null;
    }

    return slots;
};

export default function CalendarSection() {
  const [date, setDate] = useState(new Date());
  const [slot, setSlot] = useState("");
  const [openForm, setOpenForm] = useState(false);

  const dateSectionRef = useRef(null);
  const timeSectionRef = useRef(null);

  const selected = date.toLocaleDateString("en-CA")
  const [availability, setAvailability] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    //the following two lines to clean out old data from a different date
    setAvailability(null);
    setError("");
    
    fetch(`/api/availability/${selected}`)
    .then((res) => res.json())
    .then((data) => setAvailability(aWeekInAdvance(date, data)))
    .catch(() => setError("Unable to load availability."))
    .finally(() => setLoading(false))
  }, [selected]);

  return (
    <>
        {openForm ? 
            <BookingForm 
                open = {openForm}
                slot = {slot}
                selected = {selected}
                date = {date}
                onClose = {() => setOpenForm(false)}
            />
        :
            <div className={styles.content}>
                <DatePicker
                    date = {date} 
                    onDateChange={(newDate) => {
                        setDate(newDate);
                        setSlot("");
                        dateSectionRef.current?.scrollIntoView({
                        behavior: "smooth"
                        });
                    }} 
                />
                { loading ? 
                    <div className={styles.noSlots} ref={dateSectionRef}>
                        <h2>Loading slots...</h2>
                        <img src="https://media.tenor.com/G7LfW0O5qb8AAAAi/loading-gif.gif" alt="loading gif" />
                    </div> 
                : 
                !availability ? //null availability could be either error with fetching or helper function returning null slots to enforce a week notice
                    <div className={styles.noSlots} ref={dateSectionRef}>
                        {error ? <h2>{error}</h2>
                        :
                            <>
                                <h2>One-Week Notice Needed</h2>
                                <p>Please book at least a week in advance</p>
                            </>
                        }
                    </div> 
                :
                availability.length > 0 ? 
                    <div className={styles.yesSlots} id='dateSelected'>
                        <TimeSlots 
                            availability={availability}
                            slot = {slot}
                            onSlotSelect={(value) => {
                                        setSlot(value);
                                        timeSectionRef.current?.scrollIntoView({
                                        behavior: "smooth"
                                        });
                                    }}
                        />
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
                    </div>
                }
            </div> 
        }
    </>
  );
}