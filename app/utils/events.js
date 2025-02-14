export function getAllEvents() {
  // Import all data files
  const dataFiles = [
    require('@/configs/data.json'),
  ]

  // Combine all events into a single array
  const allEvents = dataFiles.reduce((acc, data) => {
    if (data && data.events) {
      return [...acc, ...data.events]
    }
    return acc
  }, [])

  return allEvents
}

export function eventsOverlap(event1, event2) {
  const parseTime = (timeStr) => {
    const [time, period] = timeStr.split(' ');
    let [hours, minutes] = time.split(':').map(Number);
    if (period === 'PM' && hours !== 12) hours += 12;
    if (period === 'AM' && hours === 12) hours = 0;
    return hours * 60 + minutes;
  };

  const [start1, end1] = event1.time.split(' - ').map(parseTime);
  const [start2, end2] = event2.time.split(' - ').map(parseTime);

  return start1 < end2 && start2 < end1;
} 