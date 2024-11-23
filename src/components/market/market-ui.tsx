import { AppHero } from '../ui/ui-layout'
import { Project } from './market-data-access'

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
        title="Music Project Market"
        subtitle="Invest in your favorite artists and be part of their success story"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  )
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="card bg-base-200 shadow-xl">
      <figure className="px-4 pt-4">
        <img
          src={project.imageUrl}
          alt={project.title}
          className="rounded-xl h-48 w-full object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{project.title}</h2>
        <p className="text-sm">{project.artist}</p>
        <div className="flex justify-between items-center text-sm">
          <span>Goal: {project.goal} SOL</span>
          <span>Raised: {project.raised} SOL</span>
        </div>
        <progress
          className="progress progress-primary"
          value={project.raised}
          max={project.goal}
        ></progress>
        <div className="card-actions justify-end mt-4">
          <button className="btn btn-primary btn-sm">Learn More</button>
          <button className="btn btn-secondary btn-sm">Invest</button>
        </div>
      </div>
    </div>
  )
}
