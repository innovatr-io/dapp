import { CreatorProject } from './projects-data-access'
import Image from 'next/image'
import { formatDistanceToNow } from 'date-fns'

interface ProjectsListProps {
  projects: CreatorProject[]
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
        <div key={project.id} className="card bg-base-200 shadow-xl w-full h-full flex flex-col">
          <figure className="px-4 pt-4 relative h-52 flex-shrink-0">
            <Image
              src={project.imageUrl}
              alt={project.title}
              fill
              className="rounded-xl object-cover"
            />
            <div className="absolute top-6 right-6 badge badge-primary">
              {project.status}
            </div>
          </figure>
          
          <div className="card-body flex flex-col justify-between flex-grow">
            <div className="flex flex-col h-full">
              <div className="space-y-2">
                <h2 className="card-title text-lg line-clamp-1">{project.title}</h2>
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="text-sm text-base-content/70">by {project.artist}</p>
                </div>
              </div>
              
              <div className="mt-auto">
                <div className="flex justify-between items-center text-sm mt-2">
                  <span>Goal: ${project.goal.toLocaleString()}</span>
                  <span>Raised: ${project.totalRaised.toLocaleString()}</span>
                </div>
                <progress
                  className={`progress ${project.totalRaised >= project.goal ? 'progress-success' : 'progress-primary'}`}
                  value={project.totalRaised}
                  max={project.goal}
                ></progress>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <p className="text-sm text-base-content/70">Your Investment</p>
                  <p className="font-medium">${project.invested.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-base-content/70">Return Rate</p>
                  <p className="font-medium">{project.returnRate}%</p>
                </div>
              </div>

              {project.status === 'funded' && project.claimableReturns > 0 && (
                <div className="bg-success/20 p-3 rounded-lg mt-4">
                  <p className="text-sm font-medium text-success">
                    Claimable Returns: ${project.claimableReturns.toLocaleString()}
                  </p>
                  <button className="btn btn-success btn-sm w-full mt-2">
                    Claim Returns
                  </button>
                </div>
              )}

              <div className="flex justify-between items-center text-sm mt-4">
                <span>Status: {project.status}</span>
                <span>{formatDistanceToNow(project.endDate, { addSuffix: false })} left</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

