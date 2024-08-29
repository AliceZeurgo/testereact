import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, addMonths, subMonths, eachDayOfInterval, isToday, isSameDay } from 'date-fns';
import { enUS } from 'date-fns/locale';


const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [events, setEvents] = useState({});

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);

  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const handlePrevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const handleNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  const handleAddEvent = (day) => {
    const event = prompt('Enter event:');
    if (event) {
      setEvents((prevEvents) => ({
        ...prevEvents,
        [format(day, 'yyyy-MM-dd')]: [...(prevEvents[format(day, 'yyyy-MM-dd')] || []), event],
      }));
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <button onClick={handlePrevMonth} className="px-4 py-2 bg-[#FFD0DA] text-white rounded">Prev</button>
        <h2 className="text-lg font-semibold">{format(currentMonth, 'MMMM yyyy', { locale: enUS })}</h2>
        <button onClick={handleNextMonth} className="px-4 py-2 bg-[#FFD0DA] text-white rounded">Next</button>
      </div>
      <div className="grid grid-cols-7 gap-1">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="text-center font-semibold">{day}</div>
        ))}
        {days.map((day) => (
          <div
            key={day}
            className={`p-2 border border-gray-200 ${isToday(day) ? 'bg-yellow-200' : ''} ${isSameDay(day, new Date()) ? 'bg-green-100' : ''} cursor-pointer`}
            onClick={() => handleAddEvent(day)}
          >
            <div className="text-center">{format(day, 'd')}</div>
            {events[format(day, 'yyyy-MM-dd')] && (
              <div className="mt-1 text-sm">
                {events[format(day, 'yyyy-MM-dd')].map((event, index) => (
                  <div key={index} className="text-gray-700">{event}</div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
