'use client'

import { useQuery } from '@tanstack/react-query'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { mockProjects } from './projects-data-access'
import { useState } from 'react'
import { ProjectsList } from './components/projects-list'
import { ProjectStats } from './components/project-stats'
import { ProjectsHeader } from './components/projects-header'
export function ProjectsFeature() {
  const { connection } = useConnection()
  const { publicKey } = useWallet()
  const [showNewProjectModal, setShowNewProjectModal] = useState(false)

  const [currentPage, setCurrentPage] = useState(1);
  const [projectsPerPage, setProjectsPerPage] = useState(9);

  const { data: allProjects = [], isLoading } = useQuery({
    queryKey: ['user-projects', publicKey?.toBase58()],
    queryFn: async () => {
      if (!publicKey) return []
      
      // TODO: Replace with actual blockchain data fetching
      return mockProjects
    },
    enabled: !!publicKey,
  })

  return (
    <div className="container py-8">
      <div className="flex flex-col gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Your Projects</h1>
          <p className="text-muted-foreground mt-2">
            Manage your music projects and interact with investors
          </p>
        </div>
        
        <div className="flex gap-4 flex-wrap justify-between">
          <div className="flex gap-4 flex-wrap">
            <button className="btn btn-secondary">View Analytics</button>
            <button className="btn btn-accent">Manage Distributions</button>
            <button className="btn btn-ghost">Project Guidelines</button>
          </div>
          <button 
            className="btn btn-primary"
            onClick={() => setShowNewProjectModal(true)}
          >
            Create New Project
          </button>
        </div>
      </div>

      <div className="mb-8">
        <ProjectStats projects={allProjects} />
      </div>

      <div className="divider">Your Projects</div>
      
      <ProjectsHeader />
      
      <ProjectsList 
        projects={allProjects.slice((currentPage - 1) * projectsPerPage, currentPage * projectsPerPage)}
        isLoading={isLoading}
        currentPage={currentPage}
        totalPages={Math.ceil(allProjects.length / projectsPerPage)}
        setCurrentPage={setCurrentPage}
        projectsPerPage={projectsPerPage}
        onProjectsPerPageChange={setProjectsPerPage}
        totalProjects={allProjects.length}
      />
    </div>
  )
}
