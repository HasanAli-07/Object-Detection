import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import UploadSection from "@/components/upload-section"
import Navbar from "@/components/navbar"
import AnimatedBackground from "@/components/animated-background"

export default function Home() {
  return (
    <main className="min-h-screen text-white relative overflow-hidden">
      <AnimatedBackground />

      <div className="container mx-auto px-4 py-8 relative z-10">
        <Navbar />

        <div className="mt-16 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 text-transparent bg-clip-text">
              AI-Powered
            </span>{" "}
            Object Counter
          </h1>
          <p className="text-xl text-blue-300 mb-12">
            Detect the Unseen, Analyze with Precision, Count with Intelligence!
          </p>

          <div className="max-w-2xl mx-auto mb-12">
            <div className="flex items-center space-x-2 bg-slate-800/50 backdrop-blur-sm rounded-full p-2 pl-6">
              <Input
                type="text"
                placeholder="Search your Object"
                className="border-none bg-transparent text-white focus-visible:ring-0 focus-visible:ring-offset-0"
              />
              <Button className="rounded-full bg-white text-slate-900 hover:bg-blue-100">search</Button>
            </div>
          </div>

          <UploadSection />
        </div>
      </div>
    </main>
  )
}

