import Link from "next/link"

export function Header() {
  return (
    <header className="border-b border-gray-800">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-blue-500 text-2xl font-bold">
          RivieraInfo
        </Link>
        <Link 
          href="/about" 
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full transition-colors"
        >
          About Us
        </Link>
      </div>
    </header>
  )
}

