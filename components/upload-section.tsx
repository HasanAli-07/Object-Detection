"use client"

import type React from "react"

import { useState } from "react"
import { Upload, Loader2, ImagePlus, FileVideo } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import ResultsDisplay from "./results-display"

export default function UploadSection() {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [results, setResults] = useState<any | null>(null)
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (!selectedFile) return

    setFile(selectedFile)

    // Create preview for image files
    if (selectedFile.type.startsWith("image/")) {
      const reader = new FileReader()
      reader.onload = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(selectedFile)
    } else if (selectedFile.type.startsWith("video/")) {
      // For video, we could create a thumbnail or just set a placeholder
      setPreview("/placeholder.svg?height=400&width=600")
    }
  }

  const handleUpload = async () => {
    if (!file) return

    setLoading(true)

    // Create form data to send to backend
    const formData = new FormData()
    formData.append("file", file)
    if (searchTerm) {
      formData.append("search_term", searchTerm)
    }

    try {
      // This would be your Flask backend endpoint
      const response = await fetch("http://localhost:5000/api/detect", {
        method: "POST",
        body: formData,
        credentials: "include", // Include cookies for auth
      })

      if (!response.ok) {
        throw new Error("Failed to process image")
      }

      const data = await response.json()
      setResults(data)
    } catch (error) {
      console.error("Error processing file:", error)
      alert("Error processing file. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const triggerFileInput = () => {
    document.getElementById("file-input")?.click()
  }

  return (
    <div className="max-w-4xl mx-auto">
      {!preview ? (
        <Card
          className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-md border-2 border-blue-400/30 rounded-3xl cursor-pointer overflow-hidden group transition-all duration-300 hover:border-blue-400/50 hover:shadow-lg hover:shadow-blue-500/20"
          onClick={triggerFileInput}
        >
          <CardContent className="flex flex-col items-center justify-center p-12 h-64 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 p-6 rounded-full mb-6 group-hover:scale-110 transition-transform duration-300">
              <Upload className="h-10 w-10 text-white" />
            </div>

            <p className="text-xl font-medium text-white mb-4">Upload</p>

            <div className="flex items-center space-x-4 text-blue-300/70">
              <div className="flex items-center">
                <ImagePlus className="h-4 w-4 mr-1" />
                <span className="text-sm">Images</span>
              </div>
              <div className="flex items-center">
                <FileVideo className="h-4 w-4 mr-1" />
                <span className="text-sm">Videos</span>
              </div>
            </div>

            <input
              id="file-input"
              type="file"
              accept="image/*,video/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          <div className="relative">
            {preview.startsWith("data:image") ? (
              <img
                src={preview || "/placeholder.svg"}
                alt="Preview"
                className="w-full h-auto rounded-xl border-2 border-blue-400/30 shadow-lg shadow-blue-500/10"
              />
            ) : (
              <video
                src={preview}
                controls
                className="w-full h-auto rounded-xl border-2 border-blue-400/30 shadow-lg shadow-blue-500/10"
              />
            )}

            {results && <ResultsDisplay results={results} searchTerm={searchTerm} />}

            <Button
              variant="outline"
              className="absolute top-4 right-4 bg-slate-800/80 text-white border-blue-400 backdrop-blur-sm hover:bg-slate-700/80"
              onClick={() => {
                setFile(null)
                setPreview(null)
                setResults(null)
              }}
            >
              Change
            </Button>
          </div>

          <div className="flex justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition-all duration-300"
              onClick={handleUpload}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Analyze Image"
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

