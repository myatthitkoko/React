import styles from '../styleSheets/Booking.module.css';

export default function TimeSlots({availability, slot, onSlotSelect}) {
    return (
        <>
            <h2>Available Time Slots</h2> 
            <p>Please select a time slot to continue</p>
            <div className={styles.timeSlots}>
                {availability.map((timeObject) => (
                    <div key={timeObject.value}>
                        <input 
                        type='radio' 
                        name='time' 
                        id={timeObject.display} 
                        value={timeObject.value} 
                        checked = {slot === timeObject.value}
                        onChange={() => onSlotSelect(timeObject.value)}
                        />
                        <label htmlFor={timeObject.display}>
                            {timeObject.display}
                        </label>
                    </div>
                ))}
            </div>
        </>
    );
}