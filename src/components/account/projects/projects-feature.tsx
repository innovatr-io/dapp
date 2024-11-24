'use client'

import { useQuery } from '@tanstack/react-query'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { ProjectsList } from './projects-ui'
import { mockProjects } from './projects-data-access'

export function ProjectsFeature() {
  const { connection } = useConnection()
  const { publicKey } = useWallet()

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
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Your Investments</h1>
        <p className="text-muted-foreground mt-2">
          Track your music investments and returns
        </p>
      </div>

      <ProjectsList projects={projects} isLoading={isLoading} />
    </div>
  )
}
