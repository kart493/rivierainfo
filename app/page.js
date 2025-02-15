"use client"

import { useState, useRef } from 'react'
import { HeroSearch } from "./components/hero-search";
import { HowItWorks } from "./components/how-it-works";
import { SearchResults } from "./components/search-results";
import { getAllEvents } from "./utils/events";

export default function Home() {
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [searchResults, setSearchResults] = useState([])
  const [selectedDays, setSelectedDays] = useState([])
  // const [budget, setBudget] = useState("")
  const [interests, setInterests] = useState([])
  const [selectedEvents, setSelectedEvents] = useState([])
  const [selectedTotal, setSelectedTotal] = useState(0)
  const resultsRef = useRef(null)

  const handleEventSelect = (event, isChecked) => {
    if (isChecked) {
      setSelectedEvents(prev => [...prev, event])
      const eventFee = parseInt(event.fee?.replace(/[^0-9]/g, '') || '0')
      setSelectedTotal(prev => prev + eventFee)
    } else {
      setSelectedEvents(prev => prev.filter(e => e.title !== event.title))
      const eventFee = parseInt(event.fee?.replace(/[^0-9]/g, '') || '0')
      setSelectedTotal(prev => prev - eventFee)
    }
  }

  return (
    <>
      <HeroSearch 
        onEventSelect={handleEventSelect}
        setSearchResults={setSearchResults}
        setSelectedDays={setSelectedDays}
        setInterests={setInterests}
        selectedEvents={selectedEvents}
        resultsRef={resultsRef}
      />
      <SearchResults 
        ref={resultsRef}
        results={searchResults}
        selectedEvents={selectedEvents}
        onEventSelect={handleEventSelect}
        selectedTotal={selectedTotal}
      />
      <HowItWorks />
    </>
  )
}

