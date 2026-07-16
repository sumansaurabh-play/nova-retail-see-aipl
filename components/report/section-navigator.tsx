'use client'

import { useState, useEffect } from 'react'
import { ChevronUp, ChevronDown } from 'lucide-react'

const SECTIONS = [
  { id: 'top', label: 'Start' },
  { id: 'problem', label: '01 Problem' },
  { id: 'data', label: '02 Data' },
  { id: 'insights', label: '03 Insights' },
  { id: 'method', label: '04 Method' },
  { id: 'segments', label: '05 Segments' },
  { id: 'validation', label: '06 Validation' },
  { id: 'position', label: '07 Position' },
  { id: 'recommendation', label: '08 Recommendation' },
  { id: 'roadmap', label: '09 Roadmap' },
  { id: 'risks', label: '10 Risks' },
  { id: 'takeaway', label: '11 Takeaway' },
]

export function SectionNavigator() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Find which section is currently in view
      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const element = document.getElementById(SECTIONS[i].id)
        if (element && element.getBoundingClientRect().top < window.innerHeight / 2) {
          setCurrentIndex(i)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navigate = (index: number) => {
    const section = SECTIONS[index]
    const element = document.getElementById(section.id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setCurrentIndex(index)
      setIsOpen(false)
    }
  }

  const goToPrevious = () => {
    const newIndex = Math.max(0, currentIndex - 1)
    navigate(newIndex)
  }

  const goToNext = () => {
    const newIndex = Math.min(SECTIONS.length - 1, currentIndex + 1)
    navigate(newIndex)
  }

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-3">
      {/* Navigation Buttons */}
      <div className="flex flex-col gap-2 bg-background border border-border rounded-lg shadow-lg p-3">
        {/* Section List */}
        {isOpen && (
          <div className="grid grid-cols-1 gap-1 mb-2 max-h-64 overflow-y-auto">
            {SECTIONS.map((section, index) => (
              <button
                key={section.id}
                onClick={() => navigate(index)}
                className={`px-4 py-2 text-sm text-left rounded transition-colors ${
                  index === currentIndex
                    ? 'bg-accent text-accent-foreground font-medium'
                    : 'text-foreground hover:bg-secondary'
                }`}
              >
                {section.label}
              </button>
            ))}
          </div>
        )}

        {/* Up/Down Navigation */}
        <div className="flex gap-2">
          <button
            onClick={goToPrevious}
            disabled={currentIndex === 0}
            className="flex-1 p-2 rounded bg-secondary hover:bg-secondary/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
            title="Previous section"
          >
            <ChevronUp className="w-5 h-5" />
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex-1 px-4 py-2 rounded bg-secondary hover:bg-secondary/80 text-sm font-medium transition-colors"
            title="Show all sections"
          >
            {SECTIONS[currentIndex]?.label}
          </button>
          <button
            onClick={goToNext}
            disabled={currentIndex === SECTIONS.length - 1}
            className="flex-1 p-2 rounded bg-secondary hover:bg-secondary/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
            title="Next section"
          >
            <ChevronDown className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
