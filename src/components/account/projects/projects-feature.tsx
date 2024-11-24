'use client'

import { useQuery } from '@tanstack/react-query'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { mockProjects } from './projects-data-access'
import { useState } from 'react'
import { ProjectsList } from './components/projects-list'
import { ProjectStats } from './components/project-stats'
import { QuickActions } from './components/quick-actions'

export function ProjectsFeature() {
  const { connection } = useConnection()
  const { publicKey } = useWallet()
  const [showNewProjectModal, setShowNewProjectModal] = useState(false)

  const { data: projects = [], isLoading } = useQuery({
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
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Your Projects</h1>
          <p className="text-muted-foreground mt-2">
            Manage your music projects and interact with investors
          </p>
        </div>
        <button 
          className="btn btn-primary"
          onClick={() => setShowNewProjectModal(true)}
        >
          Create New Project
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <ProjectStats projects={projects} />
        <QuickActions />
      </div>

      <div className="divider">Your Projects</div>
      
      <ProjectsList projects={projects} isLoading={isLoading} />
    </div>
  )
}
