"use client";
import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import Image from "next/image";
import { Trash2 } from "lucide-react";

export default function CalendarWithEvents() {
  const [date, setDate] = useState()
  const [eventDate, setEventDate] = useState("")
  const [eventText, setEventText] = useState("")
  const [events, setEvents] = useState({})

  const handleDateSelect = (selected) => {
    setDate(selected)
    if (selected) setEventDate(format(selected, "yyyy-MM-dd"))
  }

  const handleAddEvent = () => {
    if (!eventDate || !eventText.trim()) return
    setEvents(prev => ({
      ...prev,
      [eventDate]: [...(prev[eventDate] || []), eventText.trim()],
    }))
    setEventText("")
  }

  const handleDeleteEvent = (d, index) => {
    setEvents(prev => {
      const updated = [...(prev[d] || [])]
      updated.splice(index, 1)
      if (updated.length === 0) {
        const { [d]: _, ...rest } = prev
        return rest
      }
      return { ...prev, [d]: updated }
    })
  }

  const eventDates = Object.keys(events).map(d => new Date(d))
  const totalEvents = Object.values(events).flat().length

  return (
    <div className="p-6 font-[poppins]">
      <div className="flex gap-6">

        {/* Left: Calendar */}
        <div className="flex-1 bg-white rounded-2xl shadow-sm border border-[#f6e9e0] p-6 flex flex-col items-center">
          <h1 className="text-2xl font-semibold text-gray-800 text-center mb-1">Your Calendar</h1>
          <p className="text-sm text-gray-400 text-center mb-4">Click a date to add an event</p>
          <Image src="/calendarpenguin.png" alt="Penguin" width={260} height={260} className="mb-4" />

          <div className="w-full flex justify-center mt-2 mb-36">
            <div className="scale-[1.4] origin-top">
              <Calendar
                mode="single"
                selected={date}
                onSelect={handleDateSelect}
                className="rounded-xl border border-[#f6e9e0] shadow-sm"
                modifiers={{ hasEvent: eventDates }}
                modifiersClassNames={{
                  hasEvent:
                    "relative after:content-[''] after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-1.5 after:h-1.5 after:rounded-full after:bg-pink-500",
                }}
              />
            </div>
          </div>

          {date && (
            <p className="mt-5 text-sm text-gray-500">
              Selected:{" "}
              <span className="font-semibold text-pink-500">
                {format(date, "MMMM d, yyyy")}
              </span>
              {events[format(date, "yyyy-MM-dd")]?.length > 0 && (
                <span className="ml-2 text-yellow-500 font-medium">
                  · {events[format(date, "yyyy-MM-dd")].length} event(s)
                </span>
              )}
            </p>
          )}
        </div>

        {/* Right: Form + Events List */}
        <div className="w-[320px] flex flex-col gap-4">

          {/* Add Event */}
          <div className="bg-white rounded-2xl shadow-sm border border-[#f6e9e0] p-5">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Add Event</h2>
            <div className="flex flex-col gap-3">
              <div>
                <label className="text-xs text-gray-400 mb-1 block">Date</label>
                <input
                  type="date"
                  value={eventDate}
                  onChange={e => setEventDate(e.target.value)}
                  className="w-full border border-[#f6e9e0] px-3 py-2 rounded-xl text-sm outline-none focus:border-yellow-400 transition-colors"
                />
              </div>
              <div>
                <label className="text-xs text-gray-400 mb-1 block">Description</label>
                <input
                  type="text"
                  placeholder="What's happening?"
                  value={eventText}
                  onChange={e => setEventText(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && handleAddEvent()}
                  className="w-full border border-[#f6e9e0] px-3 py-2 rounded-xl text-sm outline-none focus:border-pink-300 transition-colors"
                />
              </div>
              <button
                onClick={handleAddEvent}
                className="w-full bg-pink-200 text-pink-800 font-medium py-2 rounded-xl hover:bg-yellow-200 hover:text-yellow-800 transition-colors text-sm"
              >
                + Add Event
              </button>
            </div>
          </div>

          {/* Events List */}
          <div className="bg-white rounded-2xl shadow-sm border border-[#f6e9e0] p-5 flex-1 overflow-y-auto max-h-[calc(100vh-340px)]">
            <h3 className="text-lg font-semibold mb-3">
              <span className="text-yellow-500">Your </span>
              <span className="text-pink-400">Events</span>
              {totalEvents > 0 && (
                <span className="ml-2 text-xs text-gray-400 font-normal">({totalEvents} total)</span>
              )}
            </h3>

            {totalEvents === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <span className="text-4xl mb-2">📅</span>
                <p className="text-sm text-gray-400">No events yet.</p>
                <p className="text-xs text-gray-300">Pick a date and add one!</p>
              </div>
            ) : (
              <ul className="flex flex-col gap-2">
                {Object.entries(events)
                  .sort(([a], [b]) => new Date(a) - new Date(b))
                  .map(([d, eventList]) =>
                    eventList.map((e, i) => (
                      <li
                        key={`${d}-${i}`}
                        className="flex items-start justify-between gap-2 bg-[#fff8f1] border border-[#f6e9e0] rounded-xl px-3 py-2"
                      >
                        <div>
                          <p className="text-xs font-semibold text-pink-500">
                            {format(new Date(d), "MMM d, yyyy")}
                          </p>
                          <p className="text-sm text-gray-700">{e}</p>
                        </div>
                        <button
                          onClick={() => handleDeleteEvent(d, i)}
                          className="text-gray-300 hover:text-red-400 mt-1 shrink-0 transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </li>
                    ))
                  )}
              </ul>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}
