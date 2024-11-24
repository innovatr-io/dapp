import { CreatorProject } from '../projects-data-access'
import { InvestmentCharts } from './investment-charts'

interface ProjectStatsProps {
  projects: CreatorProject[]
}

export function ProjectStats({ projects }: ProjectStatsProps) {
  return (
    <div className="card bg-base-200 shadow-xl">
      <div className="card-body p-6">
        <h2 className="card-title mb-4">Project Stats</h2>
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-1/3">
            <div className="stats stats-vertical shadow w-full">
              <div className="stat">
                <div className="stat-title">Total Projects</div>
                <div className="stat-value text-2xl">{projects.length}</div>
              </div>
              <div className="stat">
                <div className="stat-title">Total Raised</div>
                <div className="stat-value text-2xl">
                  ${projects.reduce((sum, p) => sum + p.totalRaised, 0).toLocaleString()}
                </div>
              </div>
              <div className="stat">
                <div className="stat-title">Total Returns</div>
                <div className="stat-value text-2xl">
                  ${projects.reduce((sum, p) => sum + p.profitsDistributed, 0).toLocaleString()}
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:w-2/3">
            <h3 className="text-lg font-semibold mb-4">Investment Trends</h3>
            <InvestmentCharts projects={projects} />
          </div>
        </div>
      </div>
    </div>
  )
}
