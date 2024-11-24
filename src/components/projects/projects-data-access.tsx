import { useQuery } from '@tanstack/react-query'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { PublicKey } from '@solana/web3.js'

export interface UserProject {
  id: string
  title: string
  artist: string
  imageUrl: string
  invested: number
  totalRaised: number
  goal: number
  status: 'active' | 'funded' | 'ended'
  claimableReturns: number
  returnRate: number
  endDate: Date
}

export function useUserProjects() {
  const { connection } = useConnection()
  const { publicKey } = useWallet()

  return useQuery({
    queryKey: ['user-projects', publicKey?.toBase58()],
    queryFn: async (): Promise<UserProject[]> => {
      if (!publicKey) return []
      
      // TODO: Replace with actual blockchain data fetching
      return mockProjects
    },
    enabled: !!publicKey,
  })
}

// Mock data for development
const mockProjects: UserProject[] = [
  {
    id: '1',
    title: 'New Jazz Album',
    artist: 'John Smith Quartet',
    imageUrl: '/mock/jazz-album.jpg',
    invested: 500,
    totalRaised: 8500,
    goal: 10000,
    status: 'active',
    claimableReturns: 0,
    returnRate: 2.5,
    endDate: new Date('2024-12-31'),
  },
  {
    id: '2',
    title: 'Electronic Music Festival',
    artist: 'Various Artists',
    imageUrl: '/mock/festival.jpg',
    invested: 1000,
    totalRaised: 50000,
    goal: 50000,
    status: 'funded',
    claimableReturns: 125,
    returnRate: 12.5,
    endDate: new Date('2024-10-15'),
  },
]
