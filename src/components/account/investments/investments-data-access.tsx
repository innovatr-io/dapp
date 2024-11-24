export interface UserInvestment {
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

// Mock data for development
export const mockInvestments: UserInvestment[] = [
  {
    id: '1',
    title: 'New Jazz Album',
    artist: 'John Smith Quartet',
    imageUrl: 'https://picsum.photos/seed/jazz/400/300',
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
    imageUrl: 'https://picsum.photos/seed/festival/400/300',
    invested: 1000,
    totalRaised: 50000,
    goal: 50000,
    status: 'funded',
    claimableReturns: 125,
    returnRate: 12.5,
    endDate: new Date('2024-10-15'),
  },
]
