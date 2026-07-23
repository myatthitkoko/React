import styles from '../styleSheets/Booking.module.css';
import Calendar from 'react-calendar';

export default function ({date, onDateChange}) {
    const today = new Date();
    today.setHours(0,0,0,0);
    return (
        <>
            <h2 className={styles.title}>Get started by selecting a date</h2>
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
                value={date} 
                onChange={onDateChange}
            />
            <p className={styles.dateSelected}>
                <span className="bold">Selected Date:</span>{' '}
                {date.toDateString()}
            </p>
        </>
    );
}