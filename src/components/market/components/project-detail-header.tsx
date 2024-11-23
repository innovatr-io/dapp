import Image from 'next/image'
import { Project } from '../market-data-access'

export function ProjectDetailHeader({ project }: { project: Project }) {
  return (
    <div className="card bg-base-200 shadow-xl">
      <figure className="relative h-96 w-full">
        <Image
          src={project.imageUrl}
          alt={project.title}
          fill
          className="object-cover"
        />
      </figure>
      <div className="card-body">
        <div className="flex flex-wrap items-center gap-4 mb-4">
          <h1 className="card-title text-3xl flex-1">{project.title}</h1>
          <div className="flex gap-2">
            {project.verified && (
              <div className="badge badge-primary">Verified</div>
            )}
            {project.trending && (
              <div className="badge badge-secondary">Trending</div>
            )}
            <div className="badge badge-outline">{project.category}</div>
          </div>
        </div>

        <div className="text-lg mb-2">by {project.artist}</div>
        <p className="text-base-content/70 mb-6">{project.description}</p>
        
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Invest Now</button>
        </div>
      </div>
    </div>
  )
}
