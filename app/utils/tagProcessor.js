export function processTagsArray(events) {
  // Get all tags from all events
  const allTags = events.flatMap(event => {
    // Handle both array of strings and comma-separated string cases
    if (!event.tags) return [];
    
    return event.tags.flatMap(tag => {
      // If the tag contains commas, split it
      if (typeof tag === 'string' && tag.includes(',')) {
        return tag.split(',').map(t => t.trim());
      }
      return tag.trim();
    });
  });

  // Remove duplicates and sort alphabetically
  const uniqueTags = [...new Set(allTags)]
    .filter(tag => tag) // Remove empty strings
    .sort((a, b) => a.localeCompare(b));

  return uniqueTags;
} 