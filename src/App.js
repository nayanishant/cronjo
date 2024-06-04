import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [events, setEvents] = useState([]);
  const [eventText, setEventText] = useState('');
  const [eventTime, setEventTime] = useState('');

  const scheduleEvent = () => {
    if (eventText && eventTime) {
      const newEvent = { text: eventText, time: new Date(eventTime) };
      setEvents([...events, newEvent]);
      setEventText('');
      setEventTime('');
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const updatedEvents = events.filter(event => {
        if (event.time <= now) {
          displayEvent(event);
          return false;
        }
        return true;
      });
      setEvents(updatedEvents);
    }, 1000);
    return () => clearInterval(interval);
  }, [events]);

  const displayEvent = (event) => {
    const timeline = document.getElementById('timeline');
    const eventElement = document.createElement('div');
    eventElement.innerText = event.text;
    timeline.appendChild(eventElement);
  };

  return (
    <div className="container">
      <div className="left">
        <h1>What's on your mind</h1>
        <input
          type="text"
          value={eventText}
          onChange={(e) => setEventText(e.target.value)}
          placeholder="Enter text here"
        />
        <input
          type="datetime-local"
          value={eventTime}
          onChange={(e) => setEventTime(e.target.value)}
        />
        <button onClick={scheduleEvent}>Submit</button>
      </div>
      <div className="right" id="timeline">
        <h1>Posts</h1>
      </div>
    </div>
  );
};

export default App;
