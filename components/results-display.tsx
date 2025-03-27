"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"

interface ResultsDisplayProps {
  results: {
    objects: {
      label: string
      count: number
      confidence: number
      boxes?: number[][]
    }[]
    total_count: number
  }
  searchTerm?: string
}

export default function ResultsDisplay({ results, searchTerm }: ResultsDisplayProps) {
  const [highlightedObjects, setHighlightedObjects] = useState<string[]>([])

  // If there's a search term, highlight those objects by default
  useEffect(() => {
    if (searchTerm) {
      const matchingObjects = results.objects
        .filter((obj) => obj.label.toLowerCase().includes(searchTerm.toLowerCase()))
        .map((obj) => obj.label)
      setHighlightedObjects(matchingObjects)
    }
  }, [results, searchTerm])

  const toggleHighlight = (label: string) => {
    setHighlightedObjects((prev) => (prev.includes(label) ? prev.filter((item) => item !== label) : [...prev, label]))
  }

  return (
    <motion.div
      className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 rounded-b-xl backdrop-blur-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-wrap gap-2 mb-2">
        {results.objects.map((obj, index) => (
          <motion.div
            key={`${obj.label}-${index}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <Badge
              variant={highlightedObjects.includes(obj.label) ? "default" : "outline"}
              className={`cursor-pointer text-white transition-all duration-300 ${
                highlightedObjects.includes(obj.label)
                  ? "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                  : "bg-slate-800/60 hover:bg-slate-700/60 border-blue-400/30"
              }`}
              onClick={() => toggleHighlight(obj.label)}
            >
              {obj.label}: {obj.count}
            </Badge>
          </motion.div>
        ))}
      </div>
      <motion.p
        className="text-white font-medium"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        Total objects detected: {results.total_count}
      </motion.p>
    </motion.div>
  )
}

