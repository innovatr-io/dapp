'use client'
import { MarketUi } from './market-ui'
import { useMarket } from './market-data-access'

export function MarketFeature() {
  const { 
    projects, 
    loading, 
    currentPage, 
    totalPages, 
    setCurrentPage, 
    allProjects,
    projectsPerPage,
    onProjectsPerPageChange,
    totalProjects,
  } = useMarket()

  return (
    <MarketUi 
      projects={projects} 
      loading={loading} 
      currentPage={currentPage}
      totalPages={totalPages}
      setCurrentPage={setCurrentPage}
      allProjects={allProjects}
      projectsPerPage={projectsPerPage}
      onProjectsPerPageChange={onProjectsPerPageChange}
      totalProjects={totalProjects}
    />
  )
}
