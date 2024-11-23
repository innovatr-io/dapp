import { Project } from '../market-data-access'

export function ProjectCard({ project, featured }: { project: Project; featured?: boolean }) {
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
