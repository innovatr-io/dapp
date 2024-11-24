import { Project } from '../market-data-access'
import { formatDistanceToNow } from 'date-fns'

export function ProjectStats({ project }: { project: Project }) {

  return (
    <>
      <div className="flex flex-col md:flex-row gap-6 mb-6">
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
        className={`progress mb-6 ${project.raised >= project.goal ? 'progress-success' : 'progress-primary'}`}
        value={project.raised}
        max={project.goal}
      ></progress>
    </>
  )
}
