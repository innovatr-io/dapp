import { AppHero } from '../ui/ui-layout'
import { Project } from './market-data-access'

function MarketHeader() {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
      <div className="flex-1 w-full">
        <div className="join w-full">
          <input 
            type="text" 
            placeholder="Search projects..." 
            className="input input-bordered join-item w-full" 
          />
          <button className="btn join-item">Search</button>
        </div>
      </div>
      <div className="flex gap-2">
        <select className="select select-bordered">
          <option>All Categories</option>
          <option>Albums</option>
          <option>Singles</option>
          <option>Tours</option>
          <option>Music Videos</option>
        </select>
        <select className="select select-bordered">
          <option>Sort by</option>
          <option>Trending</option>
          <option>Most Funded</option>
          <option>Ending Soon</option>
          <option>Newest</option>
        </select>
      </div>
    </div>
  )
}

function FeaturedProjects({ projects }: { projects: Project[] }) {
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
      <div id="featured-carousel" className="carousel rounded-box gap-4 relative group">
        <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-base-100 to-transparent w-12 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"></div>
        {featuredProjects.map((project) => (
          <div key={project.id} className="carousel-item w-full md:w-1/2 lg:w-1/3">
            <ProjectCard project={project} featured />
          </div>
        ))}
        <div className="absolute inset-y-0 right-0 bg-gradient-to-l from-base-100 to-transparent w-12 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"></div>
      </div>
    </div>
  ) : null
}

function ProjectCard({ project, featured }: { project: Project; featured?: boolean }) {
  const timeLeft = new Date(project.endDate).getTime() - new Date().getTime()
  const daysLeft = Math.ceil(timeLeft / (1000 * 60 * 60 * 24))

  return (
    <div className={`card bg-base-200 shadow-xl ${featured ? 'border-2 border-primary' : ''}`}>
      <figure className="px-4 pt-4 relative">
        <img
          src={project.imageUrl}
          alt={project.title}
          className="rounded-xl h-48 w-full object-cover"
        />
        {project.verified && (
          <div className="absolute top-6 right-6 badge badge-primary">Verified</div>
        )}
        {project.trending && (
          <div className="absolute top-6 left-6 badge badge-secondary">Trending</div>
        )}
      </figure>
      <div className="card-body">
        <div className="flex items-center gap-2">
          <h2 className="card-title flex-1">{project.title}</h2>
          <div className="badge badge-outline">{project.category}</div>
        </div>
        <p className="text-sm">{project.artist}</p>
        <p className="text-sm text-base-content/70 line-clamp-2">{project.description}</p>
        
        <div className="flex justify-between items-center text-sm mt-2">
          <span>Goal: {project.goal} SOL</span>
          <span>Raised: {project.raised} SOL</span>
        </div>
        <progress
          className="progress progress-primary"
          value={project.raised}
          max={project.goal}
        ></progress>
        
        <div className="flex justify-between items-center text-sm mt-2">
          <span>{project.backers} backers</span>
          <span>{daysLeft} days left</span>
        </div>
        
        <div className="card-actions justify-end mt-4">
          <button className="btn btn-primary btn-sm">Learn More</button>
          <button className="btn btn-secondary btn-sm">Invest</button>
        </div>
      </div>
    </div>
  )
}

export function MarketUi({ projects, loading }: { projects: Project[]; loading: boolean }) {
  if (loading) {
    return (
      <div className="text-center my-32">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-8">
      <AppHero
        title="The Stage"
        subtitle="Where artists showcase their dreams and fans become part of the journey"
      />
      
      <MarketHeader />
      <FeaturedProjects projects={projects} />
      
      <h2 className="text-2xl font-bold">All Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  )
}
