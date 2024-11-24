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
  profitsDistributed: number
  lastDistribution: Date | null
  totalReturns: number
  projectUpdates: ProjectUpdate[]
}

export interface ProjectUpdate {
  id: string
  date: Date
  title: string
  content: string
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
    endDate: new Date('2024-01-31'),
    backers: 25,
    profitsDistributed: 0,
    lastDistribution: null,
    totalReturns: 0,
    projectUpdates: [
      {
        id: '1',
        date: new Date('2024-01-15'),
        title: 'Recording Started',
        content: 'We have begun recording the album at Sunset Studios.'
      }
    ]
  },
  {
    id: '2',
    title: 'Summer Music Festival',
    description: 'A three-day music festival featuring local artists',
    imageUrl: 'https://picsum.photos/seed/festival2/400/300',
    goal: 50000,
    artist: 'Various Artists',
    totalRaised: 35000,
    invested: 2500,
    returnRate: 12.5,
    claimableReturns: 750,
    status: 'active',
    category: 'Event',
    endDate: new Date('2024-02-15'),
    backers: 150,
    profitsDistributed: 0,
    lastDistribution: null,
    totalReturns: 0,
    projectUpdates: []
  },
  {
    id: '3',
    title: 'Debut EP Release',
    description: 'A fresh take on indie rock',
    imageUrl: 'https://picsum.photos/seed/ep3/400/300',
    goal: 25000,
    artist: 'The Innovators',
    totalRaised: 28000,
    invested: 1800,
    returnRate: 8.0,
    claimableReturns: 0,
    status: 'funded',
    category: 'EP',
    endDate: new Date('2024-03-20'),
    backers: 120,
    profitsDistributed: 2240,
    lastDistribution: new Date('2024-03-25'),
    totalReturns: 2240,
    projectUpdates: []
  },
  {
    id: '4',
    title: 'Music Video Production',
    description: 'High-concept visual album',
    imageUrl: 'https://picsum.photos/seed/video4/400/300',
    goal: 30000,
    artist: 'Luna Ray',
    totalRaised: 15000,
    invested: 2000,
    returnRate: 10.0,
    claimableReturns: 0,
    status: 'active',
    category: 'Video',
    endDate: new Date('2024-04-10'),
    backers: 85,
    profitsDistributed: 0,
    lastDistribution: null,
    totalReturns: 0,
    projectUpdates: []
  },
  {
    id: '5',
    title: 'Concert Tour Funding',
    description: 'National indie music tour',
    imageUrl: 'https://picsum.photos/seed/tour5/400/300',
    goal: 45000,
    artist: 'Sound Collective',
    totalRaised: 48000,
    invested: 3000,
    returnRate: 15.0,
    claimableReturns: 450,
    status: 'funded',
    category: 'Tour',
    endDate: new Date('2024-05-25'),
    backers: 200,
    profitsDistributed: 7200,
    lastDistribution: new Date('2024-05-30'),
    totalReturns: 7200,
    projectUpdates: []
  },
  {
    id: '6',
    title: 'Studio Equipment Upgrade',
    description: 'Professional recording setup',
    imageUrl: 'https://picsum.photos/seed/studio6/400/300',
    goal: 20000,
    artist: 'Harmony Studios',
    totalRaised: 22000,
    invested: 1500,
    returnRate: 7.5,
    claimableReturns: 0,
    status: 'funded',
    category: 'Equipment',
    endDate: new Date('2024-06-30'),
    backers: 95,
    profitsDistributed: 1650,
    lastDistribution: new Date('2024-07-05'),
    totalReturns: 1650,
    projectUpdates: []
  }
]
