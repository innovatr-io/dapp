import Image from 'next/image'
import Link from 'next/link'
import { Project } from '../market-data-access'

export function ProjectCard({ project, featured }: { project: Project; featured?: boolean }) {
  const timeLeft = new Date(project.endDate).getTime() - new Date().getTime()
  const daysLeft = Math.ceil(timeLeft / (1000 * 60 * 60 * 24))

  return (
    <div className={`card bg-base-200 shadow-xl w-full h-full flex flex-col ${featured ? 'border-2 border-primary' : ''}`}>
      <figure className="px-4 pt-4 relative h-52 flex-shrink-0">
        <Image
          src={project.imageUrl}
          alt={project.title}
          fill
          className="rounded-xl object-cover"
        />
        {project.verified && (
          <div className="absolute top-6 right-6 badge badge-primary">Verified</div>
        )}
        {project.trending && (
          <div className="absolute top-6 left-6 badge badge-secondary">Trending</div>
        )}
      </figure>
      <div className="card-body flex flex-col justify-between flex-grow">
        <div className="space-y-2">
          <h2 className="card-title text-lg line-clamp-1">{project.title}</h2>
          <div className="flex items-center gap-2 flex-wrap">
            <div className="badge badge-outline">{project.category}</div>
            <p className="text-sm text-base-content/70">by {project.artist}</p>
          </div>
          <p className="text-sm text-base-content/70 line-clamp-3">{project.description}</p>
        </div>
        
        <div className="flex justify-between items-center text-sm mt-2">
          <span>Goal: ${project.goal.toLocaleString()}</span>
          <span>Raised: ${project.raised.toLocaleString()}</span>
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
          <Link href={`/market/${project.id}`} className="btn btn-primary btn-sm">
            Learn More
          </Link>
          <button className="btn btn-secondary btn-sm">Invest</button>
        </div>
      </div>
    </div>
  )
}
