import { UserProject } from './projects-data-access'
import Image from 'next/image'
import { formatDistanceToNow } from 'date-fns'

interface ProjectsListProps {
  projects: UserProject[]
  isLoading: boolean
}

export function ProjectsList({ projects, isLoading }: ProjectsListProps) {
  if (isLoading) {
    return <div>Loading your investments...</div>
  }

  if (!projects.length) {
    return (
      <div className="text-center py-10">
        <h3 className="text-xl font-semibold mb-2">No investments yet</h3>
        <p className="text-muted-foreground">
          Explore the marketplace to find exciting music projects to invest in!
        </p>
      </div>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <div key={project.id} className="card bg-base-200 shadow-xl">
          <figure className="relative aspect-video">
            <Image
              src={project.imageUrl}
              alt={project.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute top-2 right-2 badge badge-primary">
              {project.status}
            </div>
          </figure>
          
          <div className="card-body flex flex-col justify-between h-full">
            <div>
              <h2 className="card-title">{project.title}</h2>
              <p className="text-base-content/70">{project.artist}</p>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Progress</span>
                <span>{((project.totalRaised / project.goal) * 100).toFixed(1)}%</span>
              </div>
              <progress
                className="progress progress-primary w-full"
                value={project.totalRaised}
                max={project.goal}
              ></progress>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <p className="text-sm text-base-content/70">Your Investment</p>
                <p className="font-medium">${project.invested}</p>
              </div>
              <div>
                <p className="text-sm text-base-content/70">Return Rate</p>
                <p className="font-medium">{project.returnRate}%</p>
              </div>
            </div>

            {project.status === 'funded' && project.claimableReturns > 0 && (
              <div className="bg-success/20 p-3 rounded-lg mt-4">
                <p className="text-sm font-medium text-success">
                  Claimable Returns: ${project.claimableReturns}
                </p>
                <button className="btn btn-success btn-sm w-full mt-2">
                  Claim Returns
                </button>
              </div>
            )}

            <div className="text-sm text-base-content/70 mt-4">
              {project.status === 'active' ? (
                <p>Ends in {formatDistanceToNow(project.endDate, { addSuffix: false })}</p>
              ) : (
                <p>Funding {project.status}</p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

