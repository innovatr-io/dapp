import { Project } from '../market-data-access'

export function ProjectStats({ project }: { project: Project }) {
  const timeLeft = new Date(project.endDate).getTime() - new Date().getTime()
  const daysLeft = Math.ceil(timeLeft / (1000 * 60 * 60 * 24))

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
            <div className="stat-title">Days Left</div>
            <div className="stat-value">{daysLeft}</div>
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