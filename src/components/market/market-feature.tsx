'use client'
import { MarketUi } from './market-ui'
import { useMarket } from './market-data-access'

export function MarketFeature() {
  const { projects, loading, currentPage, totalPages, setCurrentPage, allProjects } = useMarket()

  return (
    <MarketUi 
      projects={projects} 
      loading={loading} 
      currentPage={currentPage}
      totalPages={totalPages}
      setCurrentPage={setCurrentPage}
      allProjects={allProjects}
    />
  )
}
