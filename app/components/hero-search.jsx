"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandInput, CommandList, CommandItem } from "@/components/ui/command"
import { CalendarIcon, X, Search } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import { format } from "date-fns"
import { getAllEvents } from "../utils/events"
import { EventCard } from "./event-card"
import { Checkbox } from "@/components/ui/checkbox"


const dummyInterests = Array.from(new Set(
  getAllEvents().flatMap(event => {
    if (!event.tags) return []
    return event.tags.flatMap(tag => 
      tag.split(',').map(t => t.trim())
    )
  })
)).sort()

export function HeroSearch({ 
  setSearchResults, 
  setSelectedDays, 
  setBudget, 
  setInterests,
  selectedEvents,
  onEventSelect,
  resultsRef
}) {
  const [date, setDate] = useState(new Date())
  const [interests, setLocalInterests] = useState([])
  const [showInterests, setShowInterests] = useState(false)
  const [eventSearchQuery, setEventSearchQuery] = useState("")
  const [interestSearchQuery, setInterestSearchQuery] = useState("")
  const [highlightedIndex, setHighlightedIndex] = useState(0)
  const [showDropdown, setShowDropdown] = useState(false)
  const [filteredEvents, setFilteredEvents] = useState([])
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [selectedEventId, setSelectedEventId] = useState(null)
  const [searchedEvent, setSearchedEvent] = useState(null)
  const [localSelectedDays, setLocalSelectedDays] = useState([])
  const [localBudget, setLocalBudget] = useState("")
  const inputRef = useRef(null)
  const dropdownRef = useRef(null)

  const filteredInterests = dummyInterests.filter(interest =>
    interest.toLowerCase().includes(interestSearchQuery.toLowerCase())
  )

  const addInterest = (interest) => {
    if (!interests.includes(interest) && interests.length < 3) {
      const newInterests = [...interests, interest];
      setLocalInterests(newInterests);
      setInterests(newInterests);
      setInterestSearchQuery("");
    }
  }

  const removeInterest = (interestToRemove) => {
    const newInterests = interests.filter(interest => interest !== interestToRemove);
    setLocalInterests(newInterests);
    setInterests(newInterests);
  }

  const handleEventSearch = (e) => {
    const query = e.target.value
    setEventSearchQuery(query)

    if (query.trim() === '') {
      setFilteredEvents([])
      setShowDropdown(false)
      return
    }

    const events = getAllEvents()
    const filtered = events.filter(event => 
      event.title.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 5)

    setFilteredEvents(filtered)
    setShowDropdown(true)
  }

  const handleSelectEvent = (event) => {
    setSelectedEvent(event)
    setEventSearchQuery(event.title)
    setShowDropdown(false)
  }

  const handleSearchClick = () => {
    if (selectedEvent) {
      const events = getAllEvents()
      const eventDetails = events.find(event => 
        event.title.toLowerCase() === selectedEvent.title.toLowerCase()
      )
      if (eventDetails) {
        setSearchedEvent(eventDetails)
      }
    }
  }

  const availableDays = [
    { id: 1, label: "Day 1", date: "20/2/2025" },
    { id: 2, label: "Day 2", date: "21/2/2025" },
    { id: 3, label: "Day 3", date: "22/2/2025" },
    { id: 4, label: "Day 4", date: "23/2/2025" },
  ]

  const handleDaySelect = (day) => {
    if (localSelectedDays.find(d => d.id === day.id)) {
      const newDays = localSelectedDays.filter(d => d.id !== day.id);
      setLocalSelectedDays(newDays);
      setSelectedDays(newDays);
    } else {
      const newDays = [...localSelectedDays, day];
      setLocalSelectedDays(newDays);
      setSelectedDays(newDays);
    }
  }

  const isFilterEnabled = () => {
    return interests.length > 0 && localSelectedDays.length > 0
  }

  const handleFilterClick = () => {
    const events = getAllEvents()
    const selectedDates = localSelectedDays.map(day => day.date)
    
    const filteredEvents = events.filter(event => {
      const dateMatches = selectedDates.includes(event.date)
      
      if (interests.includes('free')) {
        const feeStr = event.fee || event.entry_fee || '0'
        const eventFee = parseInt(feeStr.replace(/[^0-9]/g, '') || '0')
        
        return dateMatches && (
          (event.tags && event.tags.includes('free')) || 
          eventFee === 0
        )
      }
      
      const tagsMatch = event.tags?.some(tag => {
        const individualTags = tag.split(',').map(t => t.trim())
        return individualTags.some(t => 
          interests.some(interest => 
            t.toLowerCase() === interest.toLowerCase()
          )
        )
      })
      
      return dateMatches && tagsMatch
    })

    setSearchResults(filteredEvents)
    
    if (resultsRef?.current) {
      resultsRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleEventSelect = (event, isChecked) => {
    if (isChecked) {
      onEventSelect(event, true)
    } else {
      onEventSelect(event, false)
    }
  }

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (inputRef.current && !inputRef.current.contains(e.target)) {
        setShowDropdown(false)
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <h1 className="text-5xl font-bold tracking-tight">
          Find Your Perfect <span className="text-blue-500">Event Combination</span>
        </h1>
        <p className="text-xl text-gray-400">
          Discover and combine events that match your interests, schedule, and budget
        </p>
        <div className="bg-gray-900/50 p-6 rounded-lg space-y-4">
          <div className="relative">
            <div className="flex flex-wrap gap-2 mb-2">
              {interests.map((interest, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-sm bg-blue-500/20 text-blue-400 border border-blue-500/30"
                >
                  {interest}
                  <button
                    onClick={() => removeInterest(interest)}
                    className="hover:text-blue-300 transition-colors"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
            <div className="relative">
              <Input
                ref={inputRef}
                type="text"
                placeholder={`Add up to ${3 - interests.length} interests...`}
                className="bg-gray-800 border-gray-700"
                value={interestSearchQuery}
                onChange={(e) => {
                  setInterestSearchQuery(e.target.value)
                }}
                onFocus={() => setShowInterests(true)}
                onBlur={(e) => {
                  if (document.activeElement !== e.target) {
                    setTimeout(() => setShowInterests(false), 200)
                  }
                }}
              />
              {showInterests && interests.length < 3 && (
                <div 
                  ref={dropdownRef}
                  className="absolute w-full mt-1 bg-gray-800 border border-gray-700 rounded-md shadow-lg z-10"
                >
                  <div className="max-h-[200px] overflow-y-auto">
                    {filteredInterests.map((interest) => (
                      <div
                        key={interest}
                        className="px-4 py-2 cursor-pointer hover:bg-blue-500/10 hover:text-blue-400 text-left"
                        onMouseDown={(e) => {
                          e.preventDefault()
                          addInterest(interest)
                        }}
                      >
                        {interest}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="relative">
              <div className="flex flex-wrap gap-2 mb-2">
                {localSelectedDays.map((day) => (
                  <span
                    key={day.id}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-sm bg-blue-500/20 text-blue-400 border border-blue-500/30"
                  >
                    {day.label}
                    <button
                      onClick={() => handleDaySelect(day)}
                      className="hover:text-blue-300 transition-colors"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal bg-gray-800 border-gray-700"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {localSelectedDays.length > 0 
                      ? `${localSelectedDays.length} days selected`
                      : "Select days"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-4 bg-gray-800 border-gray-700">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 pb-2 border-b border-gray-700">
                      <Checkbox
                        id="select-all-days"
                        checked={localSelectedDays.length === availableDays.length}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setLocalSelectedDays(availableDays);
                            setSelectedDays(availableDays);
                          } else {
                            setLocalSelectedDays([]);
                            setSelectedDays([]);
                          }
                        }}
                        className="border-gray-600"
                      />
                      <label
                        htmlFor="select-all-days"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                      >
                        Select All Days
                      </label>
                    </div>
                    
                    {availableDays.map((day) => (
                      <div key={day.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`day-${day.id}`}
                          checked={localSelectedDays.some(d => d.id === day.id)}
                          onCheckedChange={() => handleDaySelect(day)}
                          className="border-gray-600"
                        />
                        <label
                          htmlFor={`day-${day.id}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                        >
                          {day.label} - {day.date}
                        </label>
                      </div>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            <div className="relative flex items-end">
              <Input 
                type="number" 
                placeholder="Budget" 
                className="bg-gray-800 border-gray-700 h-10"
                value={localBudget}
                onChange={(e) => setLocalBudget(e.target.value)}
              />
            </div>
          </div>

          <div className="mt-4">
            <Button 
              className="w-full relative bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 hover:from-purple-600 hover:via-blue-600 hover:to-pink-600 disabled:opacity-50 animate-gradient bg-[length:200%_200%]"
              disabled={!isFilterEnabled()}
              onClick={handleFilterClick}
            >
              <span className="relative z-10">Filter Events By Interests</span>
            </Button>
          </div>

          <div className="relative" ref={inputRef}>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search events..."
                className="bg-gray-800 border-gray-700 pl-10"
                value={eventSearchQuery}
                onChange={handleEventSearch}
              />
            </div>
            
            {showDropdown && filteredEvents.length > 0 && (
              <div className="absolute w-full mt-2 bg-gray-800/95 backdrop-blur-sm border border-gray-700 rounded-lg shadow-xl z-50 max-h-[300px] overflow-y-auto">
                {filteredEvents.map((event, index) => (
                  <div
                    key={index}
                    className="p-3 hover:bg-gray-700/50 cursor-pointer transition-colors border-b border-gray-700/50 last:border-none"
                    onClick={(e) => {
                      e.preventDefault();
                      handleSelectEvent(event);
                      setEventSearchQuery(event.title);
                      setShowDropdown(false);
                    }}
                  >
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <div className="font-medium text-gray-200">{event.title}</div>
                        <div className="text-sm text-gray-400">{event.club}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-blue-400">{event.fee || 'Free'}</div>
                        <div className="text-xs text-gray-500">{event.date}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-4">
            <Button 
              className="w-full bg-blue-500 hover:bg-blue-600 disabled:opacity-50"
              onClick={handleSearchClick}
              disabled={!selectedEvent}
            >
              Search Events By Name
            </Button>
          </div>

          {searchedEvent && (
            <div className="mt-8">
              <div className="bg-gray-800/50 p-4 rounded-lg">
                <div className="flex items-start gap-4">
                  <input
                    type="checkbox"
                    className="mt-1.5"
                    checked={selectedEvents.some(e => e.title === searchedEvent.title)}
                    onChange={(e) => onEventSelect(searchedEvent, e.target.checked)}
                  />
                  <div className="flex-1">
                    <EventCard event={searchedEvent} />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}