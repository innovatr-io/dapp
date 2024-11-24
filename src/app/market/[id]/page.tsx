'use client'

import { useEffect, useState } from 'react'
import { Project } from '@/components/market/market-data-access'
import { useMarket } from '@/components/market/market-data-access'
import { ProjectDetailHeader } from '@/components/market/components/project-detail-header'
import { ProjectStats } from '@/components/market/components/project-stats'
import { InvestmentHistory } from '@/components/market/components/investment-history'

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  const { projects } = useMarket()
  const [project, setProject] = useState<Project | null>(null)

  useEffect(() => {
    const foundProject = projects.find(p => p.id === params.id)
    setProject(foundProject || null)
  }, [params.id, projects])

  if (!project) {
    return (
      <div className="text-center my-32">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    )
  }

  return (
    <div className="container max-w-4xl mx-auto px-4">
      <ProjectDetailHeader project={project} />
      <div className="mt-8">
        <ProjectStats project={project} />
      </div>
      <div className="mt-8">
        <InvestmentHistory project={project} />
      </div>
    </div>
  )
}
