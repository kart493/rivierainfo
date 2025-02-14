import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function EventCard({ event }) {
  if (!event) return null

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader className="relative pb-0">
        <div className="flex flex-col items-center space-y-4">
          {/* Category Badge - Top Left */}
          <div className="absolute left-6 top-6">
            <Badge 
              variant="secondary" 
              className="bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs"
            >
              {event.category}
            </Badge>
          </div>
          
          {/* Price Badge - Top Right */}
          <div className="absolute right-6 top-6">
            <Badge 
              variant="secondary" 
              className="bg-green-500/10 text-green-400 border border-green-500/20"
            >
              {event.entry_fee || 'Free'}
            </Badge>
          </div>

          {/* Centered Title */}
          <CardTitle className="text-2xl text-center mt-8 mb-2">
            {event.title}
          </CardTitle>
          
          {/* Participants Info */}
          <p className="text-sm text-gray-400 text-center">
            {event.participants}
          </p>
        </div>
      </CardHeader>

      <CardContent className="space-y-6 mt-4">
        {/* Image with overlay gradient */}
        {event.image && (
          <div className="relative rounded-lg overflow-hidden">
            <img 
              src={event.image} 
              alt={event.title} 
              className="w-full h-56 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 to-transparent" />
          </div>
        )}

        {/* Description with styled container */}
        <div className="bg-gray-800/50 rounded-lg p-4">
          <p className="text-gray-300 leading-relaxed">
            {event.description}
          </p>
        </div>

        {/* Time and Date with icons */}
        <div className="flex justify-between items-center text-sm bg-gray-800/30 rounded-lg p-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-gray-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{event.date}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{event.time}</span>
            </div>
          </div>
          
          <a 
            href={event.link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors bg-blue-500/10 px-4 py-2 rounded-full"
          >
            View Details
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>

        {/* Tags with improved styling */}
        <div className="flex flex-wrap gap-2">
          {event.tags?.map((tag, index) => (
            <Badge 
              key={index} 
              variant="secondary" 
              className="bg-blue-500/10 text-blue-400 border border-blue-500/20 hover:bg-blue-500/20 transition-colors"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  )
} 