import { useState } from "react";

import {
  CalendarDays,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Edit2,
  Eye,
  EyeOff,
  MoreHorizontal,
  Plus,
  Settings,
  Trash2,
  X,
} from "lucide-react";

const monthDays = [
  30, 31, 1, 2, 3, 4, 5,
  6, 7, 8, 9, 10, 11, 12,
  13, 14, 15, 16, 17, 18, 19,
  20, 21, 22, 23, 24, 25, 26,
  27, 28, 29, 30, 1, 2, 3,
];

const weekDays = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"];

const calendars = [
  { id: "important", name: "Important", color: "bg-red-400" },
  { id: "meeting", name: "Meeting", color: "bg-cyan-400" },
  { id: "event", name: "Event", color: "bg-green-400" },
  { id: "work", name: "Work", color: "bg-yellow-400" },
  { id: "other", name: "Other", color: "bg-gray-400" },
];

const initialEvents = [
  {
    id: 1,
    day: 1,
    title: "Call Back Priscilla",
    time: "10:00",
    type: "important",
    color: "bg-red-100 border-red-400 text-gray-700",
  },
  {
    id: 2,
    day: 8,
    title: "Meeting with Judith",
    time: "10:00",
    type: "meeting",
    color: "bg-cyan-100 border-cyan-400 text-gray-700",
  },
  {
    id: 3,
    day: 8,
    title: "Meeting...",
    time: "10:00",
    type: "meeting",
    color: "bg-cyan-100 border-cyan-400 text-gray-700",
  },
  {
    id: 4,
    day: 14,
    title: "Project 'Rocket'",
    time: "10:00",
    type: "work",
    color: "bg-yellow-100 border-yellow-400 text-gray-700",
  },
  {
    id: 5,
    day: 23,
    title: "Presentation",
    time: "10:00",
    type: "event",
    color: "bg-green-100 border-green-400 text-gray-700",
  },
  {
    id: 6,
    day: 23,
    title: "Presentation",
    time: "10:00",
    type: "event",
    color: "bg-green-100 border-green-400 text-gray-700",
  },
];

function CalendarPage() {
  const [view, setView] = useState("month");
  const [events, setEvents] = useState(initialEvents);
  const [showNewCalendar, setShowNewCalendar] = useState(false);
  const [showCalendarMenu, setShowCalendarMenu] = useState(false);
  const [showNewEvent, setShowNewEvent] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [deleteEvent, setDeleteEvent] = useState(null);

  function addEvent(newEvent) {
    setEvents((prev) => [
      ...prev,
      {
        id: Date.now(),
        day: 4,
        title: newEvent.title || "New Event",
        time: newEvent.startTime || "10:00",
        type: newEvent.calendar.toLowerCase(),
        color: getEventColor(newEvent.calendar),
      },
    ]);
    setShowNewEvent(false);
  }

  function removeEvent(eventId) {
    setEvents((prev) => prev.filter((item) => item.id !== eventId));
    setDeleteEvent(null);
    setSelectedEvent(null);
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#f6f8fb] px-7 py-7">
      <div className="mb-7 flex items-center justify-between">
        <h1 className="text-[26px] font-bold text-gray-800">Calendar</h1>

        <button
          type="button"
          onClick={() => setShowNewEvent(true)}
          className="flex items-center gap-2 rounded-xl bg-[#199a42] px-5 py-3 text-[14px] font-bold text-white shadow-sm"
        >
          <Plus size={17} />
          Add Event
        </button>
      </div>

      <div className="grid grid-cols-[190px_1fr] gap-6">
        <aside className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
          <div className="mb-5 flex items-center justify-between">
            <p className="text-[12px] font-bold uppercase text-gray-400">
              Calendars
            </p>

            <div className="relative">
              <button
                type="button"
                onClick={() => setShowCalendarMenu(!showCalendarMenu)}
                className="flex h-7 w-7 items-center justify-center rounded-lg bg-gray-50 text-gray-500"
              >
                <Plus size={14} />
              </button>

              {showCalendarMenu && (
                <CalendarMiniMenu
                  onNewCalendar={() => {
                    setShowCalendarMenu(false);
                    setShowNewCalendar(true);
                  }}
                />
              )}
            </div>
          </div>

          <div className="space-y-4">
            {calendars.map((calendar) => (
              <div
                key={calendar.id}
                className="flex items-center gap-3 text-[13px] font-medium text-gray-600"
              >
                <span
                  className={`flex h-4 w-4 items-center justify-center rounded ${calendar.color} text-white`}
                >
                  <Check size={10} strokeWidth={4} />
                </span>
                {calendar.name}
              </div>
            ))}
          </div>
        </aside>

        <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
          <div className="mb-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 text-gray-500">
                <ChevronLeft size={17} />
              </button>

              <button className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 text-gray-500">
                <ChevronRight size={17} />
              </button>

              <button className="rounded-xl bg-gray-50 px-5 py-2 text-[13px] font-medium text-gray-500">
                Today
              </button>
            </div>

            <div className="text-center">
              <span className="text-[18px] font-bold text-gray-800">
                September
              </span>
              <span className="ml-2 text-[13px] font-medium text-gray-400">
                2020
              </span>
            </div>

            <div className="flex rounded-xl border border-gray-200 bg-white p-1">
              {["month", "week", "day"].map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setView(item)}
                  className={`rounded-lg px-5 py-2 text-[12px] font-bold capitalize ${
                    view === item
                      ? "bg-[#199a42] text-white"
                      : "text-gray-500"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {view === "month" && (
            <MonthView
              events={events}
              onDayClick={setSelectedDay}
              onEventClick={setSelectedEvent}
            />
          )}

          {view === "week" && <WeekView />}
          {view === "day" && <DayView />}
        </section>
      </div>

      {showNewCalendar && (
        <NewCalendarPanel onClose={() => setShowNewCalendar(false)} />
      )}

      {selectedDay && (
        <DayEventsPopup
          day={selectedDay}
          events={events.filter((event) => event.day === selectedDay)}
          onClose={() => setSelectedDay(null)}
        />
      )}

      {showNewEvent && (
        <NewEventModal
          onClose={() => setShowNewEvent(false)}
          onCreate={addEvent}
        />
      )}

      {selectedEvent && (
        <EventDetails
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
          onDelete={() => setDeleteEvent(selectedEvent)}
        />
      )}

      {deleteEvent && (
        <DeletePopup
          onCancel={() => setDeleteEvent(null)}
          onConfirm={() => removeEvent(deleteEvent.id)}
        />
      )}
    </div>
  );
}

function MonthView({ events, onDayClick, onEventClick }) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-100">
      <div className="grid grid-cols-7 border-b border-gray-100 bg-white">
        {weekDays.map((day) => (
          <div
            key={day}
            className="py-4 text-center text-[11px] font-bold text-gray-400"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7">
        {monthDays.map((day, index) => {
          const isOtherMonth = index < 2 || index > 31;
          const isToday = day === 8 && index === 9;
          const dayEvents = events.filter((event) => event.day === day);

          return (
            <div
              key={`${day}-${index}`}
              onClick={() => onDayClick(day)}
              className={`relative h-[125px] cursor-pointer border-b border-r border-gray-100 p-3 ${
                isOtherMonth
                  ? "bg-[repeating-linear-gradient(45deg,#fafafa,#fafafa_4px,#f2f2f2_4px,#f2f2f2_6px)] text-gray-300"
                  : "bg-white hover:bg-gray-50"
              } ${isToday ? "bg-green-50" : ""}`}
            >
              <div className="text-right text-[16px] font-medium text-gray-600">
                {isToday ? (
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#199a42] text-white">
                    {day}
                  </span>
                ) : (
                  day
                )}
              </div>

              <div className="mt-2 space-y-2">
                {dayEvents.slice(0, 2).map((event) => (
                  <button
                    key={event.id}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onEventClick(event);
                    }}
                    className={`flex w-full items-center justify-between border-l-4 px-2 py-1 text-left text-[11px] ${event.color}`}
                  >
                    <span>{event.title}</span>
                    <span>{event.time}</span>
                  </button>
                ))}

                {dayEvents.length > 2 && (
                  <span className="inline-flex rounded-md bg-yellow-100 px-2 py-1 text-[11px] text-gray-600">
                    +{dayEvents.length - 2}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function WeekView() {
  const days = ["MO 6", "TU 7", "WE 8", "TH 9", "FR 10", "SA 11", "SU 12"];
  const times = ["01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00"];

  return (
    <div className="overflow-hidden rounded-xl border border-gray-100">
      <div className="grid grid-cols-[70px_repeat(7,1fr)] border-b border-gray-100">
        <div />
        {days.map((day) => (
          <div
            key={day}
            className="py-3 text-center text-[12px] font-bold text-gray-500"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="relative grid grid-cols-[70px_repeat(7,1fr)]">
        <div>
          {times.map((time) => (
            <div
              key={time}
              className="h-[55px] border-b border-gray-100 pr-3 text-right text-[11px] text-gray-400"
            >
              {time}
            </div>
          ))}
        </div>

        {days.map((day, index) => (
          <div key={day} className="border-l border-gray-100">
            {times.map((time) => (
              <div key={time} className="h-[55px] border-b border-gray-100" />
            ))}

            {index === 1 && (
              <div className="absolute left-[210px] top-[70px] h-[165px] w-[110px] rounded-md border-l-4 border-cyan-400 bg-cyan-100 p-3 text-[12px]">
                10:00 - 11:30
                <br />
                Meeting with...
              </div>
            )}

            {index === 2 && (
              <div className="absolute left-[325px] top-[210px] h-[110px] w-[110px] rounded-md border-l-4 border-yellow-400 bg-yellow-100 p-3 text-[12px]">
                10:00 - 11:30
                <br />
                Project "Rocket"
              </div>
            )}

            {index === 3 && (
              <div className="absolute left-[440px] top-[360px] h-[170px] w-[110px] rounded-md border-l-4 border-teal-400 bg-teal-100 p-3 text-[12px]">
                10:00 - 11:30
                <br />
                Call Back Priscilla
              </div>
            )}

            {index === 4 && (
              <div className="absolute left-[555px] top-[190px] h-[180px] w-[110px] rounded-md border-l-4 border-green-400 bg-green-100 p-3 text-[12px]">
                10:00 - 11:30
                <br />
                Presentation
              </div>
            )}
          </div>
        ))}

        <div className="absolute left-0 right-0 top-[300px] h-px bg-red-400">
          <span className="absolute -left-1 -top-3 rounded bg-red-400 px-1 text-[10px] text-white">
            05:30
          </span>
        </div>
      </div>
    </div>
  );
}

function DayView() {
  const times = ["01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00"];

  return (
    <div className="overflow-hidden rounded-xl border border-gray-100">
      <div className="border-b border-gray-100 py-4 text-center text-[12px] font-bold text-gray-500">
        TUESDAY 7
      </div>

      <div className="relative">
        {times.map((time) => (
          <div key={time} className="flex h-[65px] border-b border-gray-100">
            <div className="w-[70px] pr-3 text-right text-[11px] text-gray-400">
              {time}
            </div>
            <div className="flex-1" />
          </div>
        ))}

        <DayEvent top="45px" height="95px" color="bg-yellow-100 border-yellow-400" title='Project "Rocket"' />
        <DayEvent top="175px" height="130px" color="bg-cyan-100 border-cyan-400" title="New Event" />
        <DayEvent top="370px" height="80px" color="bg-teal-100 border-teal-400" title="Call Back Priscilla" />
        <DayEvent top="520px" height="110px" color="bg-green-100 border-green-400" title="Presentation" />

        <div className="absolute left-0 right-0 top-[300px] h-px bg-red-400">
          <span className="absolute left-0 -top-3 rounded bg-red-400 px-1 text-[10px] text-white">
            05:30
          </span>
        </div>
      </div>
    </div>
  );
}

function DayEvent({ top, height, color, title }) {
  return (
    <div
      className={`absolute left-[75px] right-2 rounded-md border-l-4 p-3 text-[12px] ${color}`}
      style={{ top, height }}
    >
      10:00 - 11:30
      <br />
      {title}
    </div>
  );
}

function NewCalendarPanel({ onClose }) {
  const colors = [
    "bg-red-300",
    "bg-teal-300",
    "bg-yellow-300",
    "bg-green-300",
    "bg-cyan-300",
    "bg-green-200",
    "bg-lime-200",
    "bg-purple-300",
    "bg-pink-300",
    "bg-gray-300",
  ];

  return (
    <div className="fixed left-[230px] top-0 z-50 h-screen w-[360px] bg-white p-7 shadow-2xl">
      <div className="mb-7 flex items-center justify-between">
        <h2 className="text-[26px] font-bold text-gray-800">New Calendar</h2>
        <button
          type="button"
          onClick={onClose}
          className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-50 text-gray-500"
        >
          <X size={15} />
        </button>
      </div>

      <Input label="Name" value="Personal" />
      <label className="mb-2 mt-5 block text-[12px] font-medium text-gray-400">
        Description
      </label>
      <textarea
        placeholder="Type something"
        className="h-[120px] w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-[13px] outline-none"
      />

      <p className="mb-3 mt-5 text-[12px] font-medium text-gray-400">Color</p>
      <div className="grid grid-cols-5 gap-3">
        {colors.map((color, index) => (
          <button
            key={`${color}-${index}`}
            className={`h-7 rounded ${color} ${
              index === 1 ? "ring-2 ring-[#199a42]" : ""
            }`}
          >
            {index === 1 && <Check size={15} className="mx-auto text-white" />}
          </button>
        ))}
      </div>

      <button className="mt-8 w-full rounded-xl bg-[#199a42] py-3 text-[14px] font-bold text-white">
        Create
      </button>
    </div>
  );
}

function CalendarMiniMenu({ onNewCalendar }) {
  const colors = [
    "bg-red-400",
    "bg-teal-400",
    "bg-yellow-400",
    "bg-green-400",
    "bg-cyan-400",
    "bg-green-500",
    "bg-lime-400",
    "bg-purple-400",
    "bg-pink-400",
    "bg-gray-300",
  ];

  return (
    <div className="absolute left-[-8px] top-9 z-40 w-[170px] rounded-xl bg-white p-3 shadow-xl ring-1 ring-black/5">
      <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-[12px] text-gray-600 hover:bg-gray-50">
        <Eye size={14} />
        Display this Only
      </button>

      <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-[12px] text-gray-600 hover:bg-gray-50">
        <EyeOff size={14} />
        Hide from List
      </button>

      <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-[12px] text-gray-600 hover:bg-gray-50">
        <Settings size={14} />
        Settings
      </button>

      <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-[12px] text-red-400 hover:bg-red-50">
        <Trash2 size={14} />
        Delete Calendar
      </button>

      <div className="mt-3 grid grid-cols-5 gap-2 border-t border-gray-100 pt-3">
        {colors.map((color, index) => (
          <button
            key={`${color}-${index}`}
            onClick={index === 0 ? onNewCalendar : undefined}
            className={`h-5 w-5 rounded-full ${color}`}
          />
        ))}
      </div>
    </div>
  );
}

function DayEventsPopup({ day, events, onClose }) {
  return (
    <div className="fixed left-[620px] top-[390px] z-50 w-[235px] rounded-xl bg-white p-4 shadow-2xl ring-1 ring-black/5">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-[13px] font-bold text-gray-700">Thursday {day}</h3>
        <button onClick={onClose} className="text-gray-400">
          <X size={14} />
        </button>
      </div>

      <div className="space-y-2">
        {[...events, ...events].slice(0, 5).map((event, index) => (
          <div
            key={`${event.id}-${index}`}
            className={`flex items-center justify-between rounded-md px-3 py-2 text-[11px] ${event.color}`}
          >
            <span>{index % 2 === 0 ? "New Event" : event.title}</span>
            <span>10:00</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function NewEventModal({ onClose, onCreate }) {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimeList, setShowTimeList] = useState(false);
  const [form, setForm] = useState({
    title: "Sending order",
    description: "Sending order #25789 Felicia Burke at 5:30",
    startTime: "00:00",
    endTime: "00:00",
    startDate: "12.07.2020",
    endDate: "12.07.2020",
    allDay: true,
    repeat: false,
    calendar: "Important",
  });

  function update(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  const times = ["00:00", "00:30", "01:00", "01:30", "02:00", "02:30"];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/25 pt-24">
      <div className="w-[430px] rounded-xl bg-white p-7 shadow-2xl">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-[26px] font-bold text-gray-800">New Event</h2>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-50 text-gray-500"
          >
            <X size={15} />
          </button>
        </div>

        <Input
          label="Title"
          value={form.title}
          onChange={(e) => update("title", e.target.value)}
        />

        <label className="mb-2 mt-5 block text-[12px] font-medium text-gray-400">
          Description
        </label>
        <textarea
          value={form.description}
          onChange={(e) => update("description", e.target.value)}
          className="h-[95px] w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-[13px] text-gray-700 outline-none"
        />

        <p className="mb-2 mt-5 text-[12px] font-medium text-gray-400">
          Time and Date
        </p>

        <div className="grid grid-cols-2 gap-4">
          <div className="relative flex h-11 rounded-xl border border-gray-200">
            <button
              type="button"
              onClick={() => setShowTimeList(!showTimeList)}
              className="w-1/2 border-r border-gray-200 text-[12px] text-gray-600"
            >
              {form.startTime}
            </button>

            <button
              type="button"
              onClick={() => setShowDatePicker(!showDatePicker)}
              className="w-1/2 text-[12px] text-gray-600"
            >
              {form.startDate}
            </button>

            {showTimeList && (
              <div className="absolute left-0 top-12 z-50 w-[100px] rounded-xl bg-white py-2 shadow-xl ring-1 ring-black/5">
                {times.map((time) => (
                  <button
                    key={time}
                    onClick={() => {
                      update("startTime", time);
                      setShowTimeList(false);
                    }}
                    className="block w-full px-4 py-2 text-left text-[12px] text-gray-600 hover:bg-gray-50"
                  >
                    {time === form.startTime && (
                      <Check size={12} className="mr-2 inline text-[#199a42]" />
                    )}
                    {time}
                  </button>
                ))}
              </div>
            )}

            {showDatePicker && (
              <SmallDatePicker onSelect={() => setShowDatePicker(false)} />
            )}
          </div>

          <div className="flex h-11 rounded-xl border border-gray-200">
            <button className="w-1/2 border-r border-gray-200 text-[12px] text-gray-600">
              {form.endTime}
            </button>
            <button className="w-1/2 text-[12px] text-gray-600">
              {form.endDate}
            </button>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-7">
          <label className="flex items-center gap-2 text-[12px] text-gray-600">
            <input
              type="checkbox"
              checked={form.allDay}
              onChange={(e) => update("allDay", e.target.checked)}
              className="accent-[#199a42]"
            />
            All Day
          </label>

          <label className="flex items-center gap-2 text-[12px] text-gray-600">
            <input
              type="checkbox"
              checked={form.repeat}
              onChange={(e) => update("repeat", e.target.checked)}
              className="accent-[#199a42]"
            />
            Repeat
          </label>
        </div>

        <label className="mb-2 mt-5 block text-[12px] font-medium text-gray-400">
          Calendar
        </label>
        <select
          value={form.calendar}
          onChange={(e) => update("calendar", e.target.value)}
          className="h-11 w-full rounded-xl border border-gray-200 px-4 text-[13px] text-gray-700 outline-none"
        >
          <option>Important</option>
          <option>Meeting</option>
          <option>Event</option>
          <option>Work</option>
          <option>Other</option>
        </select>

        <div className="mt-6 flex justify-end">
          <button
            onClick={() => onCreate(form)}
            className="rounded-xl bg-[#199a42] px-8 py-3 text-[13px] font-bold text-white"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}

function SmallDatePicker({ onSelect }) {
  const days = [28, 29, 30, 31, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 1];

  return (
    <div className="absolute left-0 top-12 z-50 w-[250px] rounded-xl bg-white p-4 shadow-2xl ring-1 ring-black/5">
      <div className="mb-4 flex items-center justify-between">
        <button className="text-gray-400">
          <ChevronLeft size={15} />
        </button>
        <p className="text-[14px] font-bold text-gray-700">
          September <span className="text-gray-400">2020</span>
        </p>
        <button className="text-gray-400">
          <ChevronRight size={15} />
        </button>
      </div>

      <div className="mb-2 grid grid-cols-7 text-center text-[10px] font-bold text-gray-400">
        {["MO", "TU", "WE", "TH", "FR", "SA", "SU"].map((day) => (
          <span key={day}>{day}</span>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-[11px] text-gray-600">
        {days.map((day, index) => (
          <button
            key={`${day}-${index}`}
            onClick={onSelect}
            className={`h-7 rounded-full ${
              day === 4 && index === 7
                ? "bg-[#199a42] text-white"
                : "hover:bg-gray-100"
            }`}
          >
            {day}
          </button>
        ))}
      </div>
    </div>
  );
}

function EventDetails({ event, onClose, onDelete }) {
  return (
    <div className="fixed right-[90px] top-[255px] z-50 w-[360px] rounded-xl bg-white p-6 shadow-2xl ring-1 ring-black/5">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="h-4 w-4 rounded bg-red-400" />
          <h3 className="text-[18px] font-bold text-gray-800">{event.title}</h3>
        </div>

        <div className="flex items-center gap-3 text-gray-500">
          <Edit2 size={16} />
          <button onClick={onDelete}>
            <Trash2 size={16} />
          </button>
          <MoreHorizontal size={16} />
          <button onClick={onClose}>
            <X size={16} />
          </button>
        </div>
      </div>

      <p className="mb-4 text-[12px] font-medium text-gray-500">
        Wednesday, September 1 · 00:30 - 01:30
      </p>

      <p className="mb-4 text-[12px] leading-5 text-gray-500">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Vestibulum risus egestas elementum erat elementum a est.
      </p>

      <div className="flex items-center gap-3 text-[12px] font-medium text-gray-600">
        <CalendarDays size={15} />
        Important
      </div>
    </div>
  );
}

function DeletePopup({ onCancel, onConfirm }) {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/25">
      <div className="w-[380px] rounded-xl bg-white p-7 shadow-2xl">
        <h2 className="mb-3 text-[20px] font-bold text-gray-800">
          Deleting Event
        </h2>

        <p className="mb-7 text-[13px] text-gray-500">
          Are you sure you want to delete this event?
        </p>

        <div className="flex justify-end gap-4">
          <button
            onClick={onCancel}
            className="rounded-xl border border-gray-200 px-7 py-3 text-[13px] font-bold text-gray-600"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="rounded-xl bg-red-400 px-8 py-3 text-[13px] font-bold text-white"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}

function Input({ label, value, onChange }) {
  return (
    <div>
      <label className="mb-2 block text-[12px] font-medium text-gray-400">
        {label}
      </label>

      <input
        value={value}
        onChange={onChange}
        className="h-11 w-full rounded-xl border border-gray-200 px-4 text-[13px] text-gray-700 outline-none"
      />
    </div>
  );
}

function getEventColor(calendar) {
  const colors = {
    Important: "bg-red-100 border-red-400 text-gray-700",
    Meeting: "bg-cyan-100 border-cyan-400 text-gray-700",
    Event: "bg-green-100 border-green-400 text-gray-700",
    Work: "bg-yellow-100 border-yellow-400 text-gray-700",
    Other: "bg-gray-100 border-gray-400 text-gray-700",
  };

  return colors[calendar] || colors.Important;
}

export default CalendarPage;