import { CreatorProject } from '../projects-data-access'
import { InvestmentCharts } from './investment-charts'

interface ProjectStatsProps {
  projects: CreatorProject[]
}

export function ProjectStats({ projects }: ProjectStatsProps) {
  return (
    <div className="card bg-base-200 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">Project Stats</h2>
        <div className="stats stats-vertical shadow mb-6">
          <div className="stat">
            <div className="stat-title">Total Projects</div>
            <div className="stat-value">{projects.length}</div>
          </div>
          <div className="stat">
            <div className="stat-title">Total Raised</div>
            <div className="stat-value">
              ${projects.reduce((sum, p) => sum + p.totalRaised, 0).toLocaleString()}
            </div>
          </div>
          <div className="stat">
            <div className="stat-title">Total Returns Distributed</div>
            <div className="stat-value">
              ${projects.reduce((sum, p) => sum + p.profitsDistributed, 0).toLocaleString()}
            </div>
          </div>
        </div>
        
        <h3 className="text-lg font-semibold mb-4">Investment Trends</h3>
        <InvestmentCharts projects={projects} />
      </div>
    </div>
  )
}
