import { AppHero } from '../ui/ui-layout'
import { Project } from './market-data-access'
import { MarketHeader } from './components/market-header'
import { FeaturedProjects } from './components/featured-projects'
import { ProjectCard } from './components/project-card'

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
