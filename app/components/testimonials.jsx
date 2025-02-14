"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Event Planner",
    avatar: "S",
    content:
      "The event combination feature saved me so much time! I was able to plan my entire weekend with perfectly timed events.",
  },
  {
    name: "Michael Chen",
    role: "Tech Enthusiast",
    avatar: "M",
    content:
      "The filtering system is brilliant! I can easily find events that match my interests and budget. Absolutely love it!",
  },
  {
    name: "Rachel Torres",
    role: "Student",
    avatar: "R",
    content:
      "As a student on a budget, this platform helps me find the perfect combination of events without breaking the bank!",
  },
]

export function Testimonials() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-bold">What Our Users Say</h2>
          <p className="text-gray-400">Real experiences from event enthusiasts</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-gray-900 border-gray-800">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-gray-400">{testimonial.role}</div>
                  </div>
                </div>
                <div className="flex text-blue-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300">{testimonial.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

