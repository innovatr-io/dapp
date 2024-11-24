'use client'

import { useQuery } from '@tanstack/react-query'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { ProjectsList } from './projects-ui'
import { mockProjects } from './projects-data-access'
import { useState } from 'react'

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
        <div className="card bg-base-200 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Project Stats</h2>
            <div className="stats stats-vertical shadow">
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
          </div>
        </div>
        
        <div className="card bg-base-200 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Quick Actions</h2>
            <div className="space-y-2">
              <button className="btn btn-secondary w-full">View Analytics</button>
              <button className="btn btn-accent w-full">Manage Distributions</button>
              <button className="btn btn-ghost w-full">Project Guidelines</button>
            </div>
          </div>
        </div>
      </div>

      <div className="divider">Your Projects</div>
      
      <ProjectsList projects={projects} isLoading={isLoading} />
    </div>
  )
}
