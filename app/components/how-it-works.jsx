import { Search, ClipboardList, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"

const steps = [
  {
    icon: Search,
    title: "Search Events",
    description: "Enter your interests, set your date range and budget to find events that match your preferences",
  },
  {
    icon: ClipboardList,
    title: "Select Multiple Events",
    description: "Choose multiple events that interest you from our curated selection",
  },
  {
    icon: FileText,
    title: "View Summary",
    description: "Get a comprehensive overview of all your selected events in one place, including schedules and total costs",
  },
]

export function HowItWorks() {
  return (
    <section className="py-20 px-4 bg-black">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-bold">How It Works</h2>
          <p className="text-gray-400">Find and combine perfect events in just a few simple steps</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="bg-gray-800 p-6 rounded-lg text-center space-y-4">
              <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto">
                <step.icon className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold">{step.title}</h3>
              <p className="text-gray-400">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
