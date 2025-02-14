import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-gray-800 py-12">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-blue-500">RivieraInfo</h3>
          <p className="text-gray-400">Discover and combine perfect events that match your interests and schedule.</p>
          <div className="flex space-x-4">
            <Link href="#" className="text-gray-400 hover:text-white">
              Twitter
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white">
              Facebook
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white">
              LinkedIn
            </Link>
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Quick Links</h4>
          <div className="space-y-2">
            <Link href="#" className="block text-gray-400 hover:text-white">
              About Us
            </Link>
            <Link href="#" className="block text-gray-400 hover:text-white">
              How It Works
            </Link>
            <Link href="#" className="block text-gray-400 hover:text-white">
              Contact
            </Link>
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Legal</h4>
          <div className="space-y-2">
            <Link href="#" className="block text-gray-400 hover:text-white">
              Privacy Policy
            </Link>
            <Link href="#" className="block text-gray-400 hover:text-white">
              Terms of Service
            </Link>
          </div>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Stay Updated</h4>
          <div className="space-y-4">
            <Input type="email" placeholder="Enter your email" className="bg-gray-800 border-gray-700" />
            <Button className="w-full bg-blue-500 hover:bg-blue-600">Subscribe</Button>
          </div>
        </div>
      </div>
    </footer>
  )
}

