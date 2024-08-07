import React, { useMemo } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, getDay, isToday } from "date-fns";
import clsx from 'clsx';

const WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

interface Event {
    date: Date;
    title: string;
}

interface CalendarProps {
    events: Event[];
    onDateClick: (date: Date) => void;
    className?: string; // className prop
}

const Calendar: React.FC<CalendarProps> = ({ events, onDateClick, className }) => {
    const currentDate = new Date();
    const firstOfMonth = startOfMonth(currentDate);
    const lastOfMonth = endOfMonth(currentDate);

    const monthDays = eachDayOfInterval({
        start: firstOfMonth,
        end: lastOfMonth,
    });

    const startIndex = getDay(firstOfMonth);

    const eventsByDate = useMemo(() => {
        return events.reduce((acc: { [key: string]: Event[] }, event) => {
            const dateKey = format(event.date, "yyyy-MM-dd");
            if (!acc[dateKey]) {
                acc[dateKey] = [];
            }
            acc[dateKey].push(event);
            return acc;
        }, {});
    }, [events]);

    return (
        <div className={clsx("calendar-container", className)}> {/* Combine default and additional class names */}
            <div className="calendar-header">
                <h2>{format(currentDate, "MMMM yyyy")}</h2>
            </div>
            <div className="calendar-grid">
                {WEEKDAYS.map((day) => (
                    <div key={day} className="calendar-weekday">
                        {day}
                    </div>
                ))}

                {Array.from({ length: startIndex }).map((_, index) => (
                    <div key={`empty-${index}`} className="calendar-day empty" />
                ))}

                {monthDays.map((day, index) => {
                    const dateKey = format(day, "yyyy-MM-dd");
                    const todaysEvents = eventsByDate[dateKey] || [];
                    return (
                        <button
                            key={index}
                            className={clsx("calendar-day", {
                                "today": isToday(day),
                                "has-event": todaysEvents.length > 0,
                            })}
                            onClick={() => onDateClick(day)}
                        >
                            {format(day, "d")}
                            {todaysEvents.map((event) => (
                                <div key={event.title} className="bg-green-500 rounded-md text-gray-900">
                                    {event.title}
                                </div>
                            ))}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default Calendar;
