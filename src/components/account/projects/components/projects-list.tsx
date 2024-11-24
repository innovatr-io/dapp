import { CreatorProject } from '../projects-data-access'
import { ProjectCard } from './project-card'

interface ProjectsListProps {
  projects: CreatorProject[]
  isLoading: boolean
  currentPage: number
  totalPages: number
  setCurrentPage: (page: number) => void
  projectsPerPage: number
  onProjectsPerPageChange: (size: number) => void
  totalProjects: number
}

export function ProjectsList({ 
  projects, 
  isLoading,
  currentPage,
  totalPages,
  setCurrentPage,
  projectsPerPage,
  onProjectsPerPageChange,
  totalProjects
}: ProjectsListProps) {
  if (isLoading) {
    return <div>Loading your projects...</div>
  }

  if (!projects.length) {
    return (
      <div className="text-center py-10">
        <h3 className="text-xl font-semibold mb-2">No projects yet</h3>
        <p className="text-muted-foreground">
          Create your first project to start raising funds!
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-4">
        <div className="flex items-center gap-2">
          <span className="text-sm">Projects per page:</span>
          <select 
            className="select select-bordered select-sm" 
            value={projectsPerPage}
            onChange={(e) => onProjectsPerPageChange(Number(e.target.value))}
          >
            <option value="6">6</option>
            <option value="9">9</option>
            <option value="12">12</option>
            <option value="15">15</option>
          </select>
          <span className="text-sm text-base-content/70">
            Showing {(currentPage - 1) * projectsPerPage + 1}-{Math.min(currentPage * projectsPerPage, totalProjects)} of {totalProjects}
          </span>
        </div>

        {totalPages > 1 && (
          <div className="join">
            <button
              className="join-item btn btn-sm"
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
            >
              «
            </button>
            <button
              className="join-item btn btn-sm"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              ‹
            </button>
            
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }
              
              return (
                <button
                  key={i}
                  className={`join-item btn btn-sm ${currentPage === pageNum ? 'btn-active' : ''}`}
                  onClick={() => setCurrentPage(pageNum)}
                >
                  {pageNum}
                </button>
              );
            })}
            
            <button
              className="join-item btn btn-sm"
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
            >
              ›
            </button>
            <button
              className="join-item btn btn-sm"
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
            >
              »
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
