import { useEffect } from 'react'
import { Project } from '../market-data-access'
import { ProjectCard } from './project-card'

export function FeaturedProjects({ projects }: { projects: Project[] }) {
  const featuredProjects = projects.filter(p => p.featured)
  
  useEffect(() => {
    const carousel = document.getElementById('featured-carousel')
    let interval: NodeJS.Timeout

    const scrollNext = () => {
      if (carousel) {
        carousel.scrollBy({ left: 300, behavior: 'smooth' })
      }
    }

    const checkScroll = () => {
      if (carousel) {
        const isAtEnd = carousel.scrollLeft >= carousel.scrollWidth - carousel.clientWidth - 10
        if (isAtEnd) {
          carousel.scrollTo({ left: 0, behavior: 'smooth' })
        }
      }
    }

    interval = setInterval(scrollNext, 3000)
    carousel?.addEventListener('scroll', checkScroll)

    // Pause on hover
    const pauseScroll = () => clearInterval(interval)
    const resumeScroll = () => {
      clearInterval(interval)
      interval = setInterval(scrollNext, 3000)
    }

    carousel?.addEventListener('mouseenter', pauseScroll)
    carousel?.addEventListener('mouseleave', resumeScroll)

    return () => {
      clearInterval(interval)
      carousel?.removeEventListener('scroll', checkScroll)
      carousel?.removeEventListener('mouseenter', pauseScroll)
      carousel?.removeEventListener('mouseleave', resumeScroll)
    }
  }, [])

  return featuredProjects.length ? (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Featured Projects</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm text-base-content/70">Scroll to see more</span>
          <div className="flex gap-2">
            <button className="btn btn-circle btn-sm" onClick={() => document.getElementById('featured-carousel')?.scrollBy(-300, 0)}>
              ←
            </button>
            <button className="btn btn-circle btn-sm" onClick={() => document.getElementById('featured-carousel')?.scrollBy(300, 0)}>
              →
            </button>
          </div>
        </div>
      </div>
      <div id="featured-carousel" className="carousel rounded-box relative group overflow-x-auto">
        <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-base-100 to-transparent w-12 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"></div>
        {featuredProjects.map((project) => (
          <div key={project.id} className="carousel-item w-full md:w-1/2 lg:w-1/3 px-2">
            <ProjectCard project={project} featured />
          </div>
        ))}
        <div className="absolute inset-y-0 right-0 bg-gradient-to-l from-base-100 to-transparent w-12 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"></div>
      </div>
    </div>
  ) : null
}
