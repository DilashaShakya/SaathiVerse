"use client";
import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

export default function CalendarWithEvents() {
  const [date, setDate] = useState();
  const [eventDate, setEventDate] = useState("");
  const [eventText, setEventText] = useState("");
  const [events, setEvents] = useState({});

  const handleAddEvent = () => {
    if (eventDate && eventText) {
      setEvents((prev) => ({
        ...prev,
        [eventDate]: eventText,
      }));
      setEventText("");
    }
  };

  const eventDates = Object.keys(events).map((d) => new Date(d));

  return (
    <Card className="w-[98%] h-[95vh] mx-auto mt-6 rounded-2xl p-6 shadow-md bg-white bg-white mt-6 ml-3 mr-6">
  <CardContent className="font-[poppins] flex justify-between gap-10">
    {/* Left: Calendar with penguin */}
    <div className="flex flex-col items-center text-center flex-1">
      <h1 className="font-semibold text-3xl text-gray-800 mb-2">
        Add lists on your calendar, share it with friends and go together!
      </h1>
      
      {/* 🐧 Penguin image above calendar */}
      <Image
        src="/calendarpenguin.png"
        alt="Penguin"
        width={450}
        height={450}
        className="mb-8 "
      />

      {/* Calendar */}
      <div className="mt-2">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-xl border border-black p-4 shadow-md transform scale-[1.6] p-6 mt-8"
          modifiers={{ hasEvent: eventDates }}
          modifiersClassNames={{
            hasEvent:
              "relative after:content-[''] after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-1.5 after:h-1.5 after:rounded-full after:bg-pink-500",
          }}
        />
      </div>
    </div>

    {/* Right: Event Form */}
    <div className="w-[300px] flex flex-col gap-4 border-l border-gray-200 pl-6 pt-4">
      <h2 className="text-xl font-semibold ">Add Event</h2>
      <input
        type="date"
        value={eventDate}
        onChange={(e) => setEventDate(e.target.value)}
        className="border border-yellow-400 px-2 py-1 rounded-lg shadow-sm"
      />
      <input
        type="text"
        placeholder="Event description"
        value={eventText}
        onChange={(e) => setEventText(e.target.value)}
        className="border border-pink-300 px-2 py-1 rounded-lg shadow-sm"
      />
      <button
        onClick={handleAddEvent}
        className="bg-red-400 text-white px-4 py-2 rounded-lg hover:bg-yellow-500 transition"
      >
        Add Event
      </button>

      <div className="mt-4">
        <h3 className="font-medium mb-1 text-2xl"><span className="text-yellow-400">Your </span><span className="text-pink-300">Events</span></h3>
        <ul className="text-left text-sm text-gray-700">
          {Object.entries(events).map(([d, e], i) => (
            <li key={i}>
              <strong>{format(new Date(d), "MMM d")}:</strong> {e}
            </li>
          ))}
        </ul>
      </div>
    </div>
  </CardContent>
</Card>

  );
}
