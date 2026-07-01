import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'
import './App.css';

export default function App() {
  const [date, setDate] = useState(new Date());

  return (
    <div className="content">
      <h1 className="heading">
        wanda<span className="red">vision</span>
      </h1>
      <div className="calender-container">
        <Calendar 
          tileContent={({ date, view}) =>
          view === "month" && date.toISOString().split("T")[0] === "2026-07-10" ? (
            <div style={{position: "absolute", margin: "40px 0px 0px 0px"}}><img src="/heart.svg" style={{width: 70, height: 70}}/></div>
          ): null}
          calendarType="gregory"
          onChange={setDate} 
          value={date} 
          formatShortWeekday={(locale, date) => 
            date.toLocaleDateString(locale, { weekday: 'long' })}
        />
      </div>
      <p className="text-center">
        <span className="bold">Selected Date:</span>{' '}
        {date.toDateString()}
      </p>
    </div>
  );
}