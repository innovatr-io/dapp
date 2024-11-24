import { Project } from '../market-data-access'
import { formatDistanceToNow } from 'date-fns'

export function ProjectStats({ project }: { project: Project }) {

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="stats shadow">
          <div className="stat">
            <div className="stat-title">Goal</div>
            <div className="stat-value text-primary">${project.goal.toLocaleString()}</div>
          </div>
          <div className="stat">
            <div className="stat-title">Raised</div>
            <div className="stat-value text-secondary">${project.raised.toLocaleString()}</div>
          </div>
        </div>
        
        <div className="stats shadow">
          <div className="stat">
            <div className="stat-title">Backers</div>
            <div className="stat-value">{project.backers}</div>
          </div>
          <div className="stat">
            <div className="stat-title">Time Left</div>
            <div className="stat-value">{formatDistanceToNow(project.endDate, { addSuffix: false })}</div>
          </div>
        </div>
      </div>

      <progress
        className="progress progress-primary mb-6"
        value={project.raised}
        max={project.goal}
      ></progress>
    </>
  )
}
