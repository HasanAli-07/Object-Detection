import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Search, User, Zap } from "lucide-react"

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between py-4 backdrop-blur-sm bg-slate-900/30 rounded-lg px-4">
      <Link href="/" className="logo-container flex items-center space-x-2 group">
        <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-2 rounded-lg shadow-lg shadow-blue-500/20 transition-all duration-300 group-hover:shadow-blue-500/40">
          <Zap className="h-6 w-6 text-white" />
        </div>
        <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text logo-text transition-all duration-300 group-hover:from-blue-300 group-hover:to-purple-300">
          DeepCount
        </span>
      </Link>

      <div className="flex items-center space-x-3">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full border-blue-400/50 text-blue-400 hover:bg-blue-500/10 hover:text-blue-300 hover:border-blue-300 icon-pulse"
        >
          <Search className="h-5 w-5" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full border-purple-400/50 text-purple-400 hover:bg-purple-500/10 hover:text-purple-300 hover:border-purple-300 icon-pulse"
        >
          <User className="h-5 w-5" />
        </Button>
      </div>
    </nav>
  )
}

