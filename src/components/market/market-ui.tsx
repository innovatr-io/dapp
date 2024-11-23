import { Project } from "./market-data-access";
import { MarketHeader } from "./components/market-header";
import { FeaturedProjects } from "./components/featured-projects";
import { ProjectCard } from "./components/project-card";

export function MarketUi({
  projects,
  loading,
  currentPage,
  totalPages,
  setCurrentPage,
  allProjects,
  projectsPerPage,
  onProjectsPerPageChange,
  totalProjects,
}: {
  projects: Project[];
  loading: boolean;
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
  allProjects: Project[];
  projectsPerPage: number;
  onProjectsPerPageChange: (size: number) => void;
  totalProjects: number;
}) {
  if (loading) {
    return (
      <div className="text-center my-32">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <MarketHeader />
      <FeaturedProjects projects={allProjects} />

      <h2 className="text-2xl font-bold">All Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-full">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8">
        <div className="flex items-center gap-2">
          <span className="text-sm">Projects per page:</span>
          <select 
            className="select select-bordered select-sm" 
            value={projectsPerPage}
            onChange={(e) => onProjectsPerPageChange(Number(e.target.value))}
          >
            <option value="9">9</option>
            <option value="12">12</option>
            <option value="15">15</option>
            <option value="18">18</option>
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
  );
}
