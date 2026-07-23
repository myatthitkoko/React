import styles from '../styleSheets/Booking.module.css';

export default function ({availability, slot, onSlotSelect}) {
    return (
        <>
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
                        onChange={() => onSlotSelect(timeObject.value)}
                        />
                        {timeObject.display}
                    </label>
                </div>
            ))}
        </>
    );
}