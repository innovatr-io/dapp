export interface CreatorProject {
  id: string
  title: string
  artist: string
  description: string
  imageUrl: string
  goal: number
  totalRaised: number
  invested: number
  status: 'draft' | 'active' | 'funded' | 'ended'
  category: string
  endDate: Date
  backers: number
  returnRate: number
  claimableReturns: number
}

// Mock data for development
export const mockProjects: CreatorProject[] = [
  {
    id: '1',
    title: 'My First Album',
    description: 'A collection of original jazz compositions',
    imageUrl: 'https://picsum.photos/seed/album1/400/300',
    goal: 15000,
    artist: 'John Smith',
    totalRaised: 5000,
    invested: 1000,
    returnRate: 2.5,
    claimableReturns: 0,
    status: 'active',
    category: 'Album',
    endDate: new Date('2024-12-31'),
    backers: 25,
  },
  {
    id: '2',
    title: 'Summer Music Festival',
    description: 'A three-day music festival featuring local artists',
    imageUrl: 'https://picsum.photos/seed/festival2/400/300',
    goal: 50000,
    artist: 'Various Artists',
    totalRaised: 50000,
    invested: 2500,
    returnRate: 12.5,
    claimableReturns: 750,
    status: 'funded',
    category: 'Event',
    endDate: new Date('2024-08-15'),
    backers: 150,
  },
]
