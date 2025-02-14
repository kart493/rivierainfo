"use client";

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { eventsOverlap } from "../utils/events"
import { useState, useEffect } from "react"
import { Checkbox } from "@/components/ui/checkbox"

export function EventCombinations({ filteredEvents, selectedDays, budget, interests }) {
  const [selectedEvents, setSelectedEvents] = useState([])
  const [selectedTotal, setSelectedTotal] = useState(0)

  const handleEventSelect = (event, isChecked) => {
    if (isChecked) {
      setSelectedEvents([...selectedEvents, event])
      const eventFee = parseInt(event.fee?.replace(/[^0-9]/g, '') || '0')
      setSelectedTotal(prev => prev + eventFee)
    } else {
      setSelectedEvents(selectedEvents.filter(e => e.title !== event.title))
      const eventFee = parseInt(event.fee?.replace(/[^0-9]/g, '') || '0')
      setSelectedTotal(prev => prev - eventFee)
    }
  }

  return (
    <section className="py-12 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-bold">Event Selection</h2>
          <p className="text-gray-400">Select events you're interested in attending</p>
        </div>

        {/* Filtered Events List */}
        <div className="space-y-4">
          {filteredEvents.map((event, idx) => (
            <div 
              key={idx} 
              className="p-4 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-colors"
            >
              <div className="flex items-start gap-4">
                <input
                  type="checkbox"
                  className="mt-1.5"
                  checked={selectedEvents.some(e => e.title === event.title)}
                  onChange={(e) => {
                    handleEventSelect(event, e.target.checked)
                  }}
                />
                <div className="flex-1 space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{event.title}</h3>
                      <p className="text-sm text-gray-400">{event.time}</p>
                    </div>
                    <span className="text-blue-400">{event.fee || 'Free'}</span>
                  </div>
                  {event.link && (
                    <a 
                      href={event.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-400 hover:text-blue-300 inline-block"
                    >
                      View Event Details →
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Selected Events Summary */}
        {selectedEvents.length > 0 && (
          <Card className="bg-gray-900 border-gray-800 mt-8">
            <CardHeader>
              <CardTitle>Selected Events Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {selectedEvents.map((event, idx) => (
                <div key={idx} className="flex justify-between items-center">
                  <div className="space-y-1">
                    <span>{event.title}</span>
                    <p className="text-sm text-gray-400">{event.time}</p>
                  </div>
                  <span className="text-blue-400">₹{parseInt(event.fee?.replace(/[^0-9]/g, '') || '0')}</span>
                </div>
              ))}
              <div className="border-t border-gray-800 pt-4 flex justify-between items-center font-bold">
                <span>Total</span>
                <span className="text-blue-500">₹{selectedTotal}</span>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  )
}

