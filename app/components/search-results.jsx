"use client"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useState, forwardRef } from "react"
import { X, ChevronDown } from "lucide-react"
import { CalendarIcon } from "lucide-react"

export const SearchResults = forwardRef(({ 
  results = [], 
  selectedEvents = [],
  selectedTotal = 0,
  onEventSelect 
}, ref) => {
  const [expandedDays, setExpandedDays] = useState([])

  const handleEventSelect = (event, isChecked) => {
    onEventSelect(event, isChecked)
  }

  // Group events by date
  const groupedEvents = results.reduce((acc, event) => {
    const date = event.date
    if (!acc[date]) {
      acc[date] = []
    }
    acc[date].push(event)
    return acc
  }, {})

  // Map dates to day labels
  const dateToDay = {
    "20/2/2025": "Day 1",
    "21/2/2025": "Day 2",
    "22/2/2025": "Day 3",
    "23/2/2025": "Day 4"
  }

  const toggleDay = (date) => {
    if (expandedDays.includes(date)) {
      setExpandedDays(expandedDays.filter(d => d !== date))
    } else {
      setExpandedDays([...expandedDays, date])
    }
  }

  return (
    <section ref={ref} className="py-12 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold">
            <span className="text-blue-500">{results.length}</span> Events Found
          </h2>
        </div>

        {/* Add Google Sheets Link Button */}
        <a
          href="https://docs.google.com/spreadsheets/d/1WcG6wHRXgDAVhNaAqusNp0q7zxmX0mRztCZOxe49AK0/edit?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full max-w-md mx-auto mt-4 px-6 py-3 text-center text-lg font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          View Complete Events Schedule 📅
        </a>

        {results.length === 0 ? (
          <div className="text-center py-16 px-4 bg-gray-900/50 rounded-lg">
            <div className="max-w-md mx-auto space-y-6">
              <div className="w-20 h-20 mx-auto bg-blue-500/10 rounded-full flex items-center justify-center">
                <CalendarIcon className="w-10 h-10 text-blue-400" />
              </div>
              <div className="space-y-3">
                <h3 className="text-2xl font-semibold text-gray-200">No Events Found</h3>
                <p className="text-gray-400">
                  Sorry, we couldn't find any events matching your selected interests and dates. 
                  Try adjusting your filters or selecting different dates.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Desktop View - Visible on md and larger screens */}
            <div className="hidden md:block">
              {Object.entries(groupedEvents)
                .sort(([dateA], [dateB]) => dateA.localeCompare(dateB))
                .map(([date, events]) => (
                  <div key={date} className="space-y-4 mb-8">
                    <h3 className="text-2xl font-semibold text-blue-400">
                      {dateToDay[date]} - {date}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {events.map((event, index) => (
                        <Card 
                          key={index} 
                          className={`bg-gray-900 border-gray-800 transition-all duration-200 ${
                            selectedEvents.some(e => e.title === event.title)
                              ? 'bg-gray-800/80 border-blue-500/50 scale-[1.02] shadow-lg shadow-blue-500/10'
                              : 'hover:bg-gray-800/70'
                          }`}
                        >
                          <CardHeader>
                            <div className="flex items-start gap-4">
                              <input
                                type="checkbox"
                                className="mt-1.5"
                                checked={selectedEvents.some(e => e.title === event.title)}
                                onChange={(e) => handleEventSelect(event, e.target.checked)}
                              />
                              <div className="space-y-2 flex-1">
                                <CardTitle>
                                  <a 
                                    href={event.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-blue-400 transition-colors"
                                  >
                                    {event.title}
                                  </a>
                                </CardTitle>
                                <div className="text-sm text-gray-400">{event.club}</div>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <p className="text-sm text-gray-300">{event.description}</p>
                            <div className="flex flex-wrap gap-2">
                              {event.tags?.map((tag, tagIndex) => {
                                // Handle both single tags and comma-separated tags
                                const tags = tag.includes(',') ? tag.split(',').map(t => t.trim()) : [tag.trim()];
                                const isCancelled = tags.some(t => t.toLowerCase() === 'cancelled');
                                
                                return tags.map((individualTag, i) => (
                                  <Badge 
                                    key={`${tagIndex}-${i}`}
                                    variant="secondary"
                                    className={`${
                                      isCancelled || individualTag.toLowerCase() === 'cancelled'
                                        ? 'bg-red-500/10 text-red-400 border border-red-500/20' 
                                        : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                                    }`}
                                  >
                                    {individualTag}
                                  </Badge>
                                ));
                              })}
                            </div>
                            <div className="flex justify-between items-center text-sm">
                              <div className="space-y-1">
                                <div className="text-gray-400">{event.time}</div>
                              </div>
                              <div className="text-blue-400 font-medium">{event.fee}</div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                ))}
            </div>

            {/* Mobile View - Visible on smaller screens */}
            <div className="md:hidden space-y-4">
              {Object.entries(groupedEvents)
                .sort(([dateA], [dateB]) => dateA.localeCompare(dateB))
                .map(([date, events]) => (
                  <div key={date} className="border border-gray-800 rounded-lg overflow-hidden">
                    <button
                      onClick={() => toggleDay(date)}
                      className="w-full flex justify-between items-center p-4 bg-gray-900 hover:bg-gray-800 transition-colors"
                    >
                      <h3 className="text-lg font-semibold text-blue-400">
                        {dateToDay[date]} - {date}
                      </h3>
                      <ChevronDown 
                        className={`h-5 w-5 transition-transform ${
                          expandedDays.includes(date) ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {expandedDays.includes(date) && (
                      <div className="space-y-4 p-4 bg-gray-900/50">
                        {events.map((event, index) => (
                          <Card 
                            key={index} 
                            className={`bg-gray-900 border-gray-800 transition-all duration-200 ${
                              selectedEvents.some(e => e.title === event.title)
                                ? 'bg-gray-800/80 border-blue-500/50 shadow-lg shadow-blue-500/10'
                                : 'hover:bg-gray-800/70'
                            }`}
                          >
                            <CardHeader>
                              <div className="flex items-start gap-4">
                                <input
                                  type="checkbox"
                                  className="mt-1.5"
                                  checked={selectedEvents.some(e => e.title === event.title)}
                                  onChange={(e) => handleEventSelect(event, e.target.checked)}
                                />
                                <div className="space-y-2 flex-1">
                                  <CardTitle>
                                    <a 
                                      href={event.link}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="hover:text-blue-400 transition-colors"
                                    >
                                      {event.title}
                                    </a>
                                  </CardTitle>
                                  <div className="text-sm text-gray-400">{event.club}</div>
                                </div>
                              </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                              <p className="text-sm text-gray-300">{event.description}</p>
                              <div className="flex flex-wrap gap-2">
                                {event.tags?.map((tag, tagIndex) => {
                                  // Handle both single tags and comma-separated tags
                                  const tags = tag.includes(',') ? tag.split(',').map(t => t.trim()) : [tag.trim()];
                                  const isCancelled = tags.some(t => t.toLowerCase() === 'cancelled');
                                  
                                  return tags.map((individualTag, i) => (
                                    <Badge 
                                      key={`${tagIndex}-${i}`}
                                      variant="secondary"
                                      className={`${
                                        isCancelled || individualTag.toLowerCase() === 'cancelled'
                                          ? 'bg-red-500/10 text-red-400 border border-red-500/20' 
                                          : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                                      }`}
                                    >
                                      {individualTag}
                                    </Badge>
                                  ));
                                })}
                              </div>
                              <div className="flex justify-between items-center text-sm">
                                <div className="space-y-1">
                                  <div className="text-gray-400">{event.time}</div>
                                </div>
                                <div className="text-blue-400 font-medium">{event.fee}</div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Selected Events Summary */}
        {selectedEvents.length > 0 && (
          <>
            <Card className="bg-gray-900 border-gray-800 mt-8">
              <CardHeader>
                <CardTitle>Selected Events Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedEvents
                  .sort((a, b) => a.date.localeCompare(b.date))
                  .map((event, idx) => (
                    <div key={idx} className="space-y-2">
                      <div className="flex justify-between items-center group">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => handleEventSelect(event, false)}
                            className="text-gray-500 hover:text-red-400 transition-colors"
                            aria-label="Remove event"
                          >
                            <X className="h-4 w-4" />
                          </button>
                          <div className="space-y-1">
                            <span>{event.title}</span>
                            <div className="flex gap-2 text-sm text-gray-400">
                              <span>{dateToDay[event.date]} ({event.date})</span>
                              <span>•</span>
                              <span>{event.time}</span>
                            </div>
                          </div>
                        </div>
                        <span className="text-blue-400">₹{parseInt(event.fee?.replace(/[^0-9]/g, '') || '0')}</span>
                      </div>
                      {event.link && (
                        <a
                          href={event.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-400 hover:text-blue-300 inline-block ml-7"
                        >
                          View Event Details →
                        </a>
                      )}
                    </div>
                  ))}
                <div className="border-t border-gray-800 pt-4 flex justify-between items-center font-bold">
                  <span>Total</span>
                  <span className="text-blue-500">₹{selectedTotal}</span>
                </div>
              </CardContent>
            </Card>
            
            {/* Add Google Sheets Link Button */}
            <a
              href="https://docs.google.com/spreadsheets/d/1WcG6wHRXgDAVhNaAqusNp0q7zxmX0mRztCZOxe49AK0/edit?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full max-w-md mx-auto mt-8 px-6 py-3 text-center text-lg font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              View Complete Events Schedule 📅
            </a>
          </>
        )}
      </div>
    </section>
  )
})

SearchResults.displayName = 'SearchResults'

