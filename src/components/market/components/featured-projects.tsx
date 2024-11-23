import { useEffect, useRef, useState } from 'react'
import { Project } from '../market-data-access'
import { ProjectCard } from './project-card'

export function FeaturedProjects({ projects }: { projects: Project[] }) {
  const featuredProjects = projects.filter(p => p.featured)
  const carouselRef = useRef<HTMLDivElement>(null)
  const [isAtStart, setIsAtStart] = useState(true)
  const [isAtEnd, setIsAtEnd] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    const carousel = carouselRef.current
    if (!carousel || featuredProjects.length === 0) return

    const checkPosition = () => {
      setIsAtStart(carousel.scrollLeft <= 10)
      setIsAtEnd(
        Math.abs(
          carousel.scrollLeft - (carousel.scrollWidth - carousel.clientWidth)
        ) <= 10
      )
    }

    let interval: NodeJS.Timeout

    const startAutoScroll = () => {
      if (isPaused) return
      interval = setInterval(() => {
        if (isAtEnd) {
          carousel.scrollTo({ left: 0, behavior: 'smooth' })
        } else {
          carousel.scrollBy({ left: carousel.clientWidth, behavior: 'smooth' })
        }
      }, 5000)
    }

    carousel.addEventListener('scroll', checkPosition)
    checkPosition()
    startAutoScroll()

    return () => {
      clearInterval(interval)
      carousel.removeEventListener('scroll', checkPosition)
    }
  }, [featuredProjects.length, isAtEnd, isPaused])

  const scroll = (direction: 'left' | 'right') => {
    if (!carouselRef.current) return
    const scrollAmount = carouselRef.current.clientWidth
    carouselRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    })
  }

  if (!featuredProjects.length) return null

  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Featured Projects</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm text-base-content/70">Scroll to see more</span>
          <div className="flex gap-2">
            <button 
              className="btn btn-circle btn-sm" 
              onClick={() => scroll('left')}
              disabled={isAtStart}
            >
              ←
            </button>
            <button 
              className="btn btn-circle btn-sm" 
              onClick={() => scroll('right')}
              disabled={isAtEnd}
            >
              →
            </button>
          </div>
        </div>
      </div>
      
      <div className="relative">
        <div 
          ref={carouselRef}
          className="overflow-x-auto hide-scrollbar snap-x snap-mandatory"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          <div className="flex gap-6">
            {featuredProjects.map((project) => (
              <div 
                key={project.id} 
                className="flex-none w-full sm:w-[calc(100%-2rem)] md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1rem)] snap-start"
              >
                <ProjectCard project={project} featured />
              </div>
            ))}
          </div>
        </div>
        
        <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-base-100 to-transparent pointer-events-none" 
             style={{ opacity: isAtStart ? 0 : 0.5 }} />
        <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-base-100 to-transparent pointer-events-none"
             style={{ opacity: isAtEnd ? 0 : 0.5 }} />
      </div>
    </div>
  )
}
