import { useState, useEffect } from 'react'

export interface Investment {
  id: string
  investor: string
  amount: number
  date: Date
  status: 'completed' | 'pending'
}

export interface Project {
  id: string
  title: string
  artist: string
  description: string
  imageUrl: string
  goal: number
  raised: number
  category: string
  endDate: Date
  backers: number
  verified: boolean
  trending?: boolean
  featured?: boolean
  investments: Investment[]
}

// This is temporary mock data - will be replaced with actual blockchain data
const MOCK_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Debut Album - New Horizons',
    artist: 'Sarah Blake',
    description: 'A fusion of jazz and electronic music pushing boundaries.',
    imageUrl: 'https://picsum.photos/seed/album1/400/300',
    goal: 100,
    raised: 65,
    category: 'Album',
    endDate: new Date('2024-12-31'),
    backers: 156,
    verified: true,
    trending: true,
    featured: true,
    investments: [
      {
        id: '1',
        investor: '7X8y...3Pqr',
        amount: 10,
        date: new Date('2024-03-15'),
        status: 'completed'
      },
      {
        id: '2',
        investor: '4Kj9...8Mnb',
        amount: 5,
        date: new Date('2024-03-14'),
        status: 'completed'
      },
      {
        id: '3',
        investor: '2Wsx...7Vfr',
        amount: 15,
        date: new Date('2024-03-13'),
        status: 'completed'
      }
    ]
  },
  {
    id: '2',
    title: 'World Tour Documentary',
    artist: 'The Midnight Crew',
    description: 'Behind the scenes of our upcoming world tour.',
    imageUrl: 'https://picsum.photos/seed/album2/400/300',
    goal: 200,
    raised: 120,
    category: 'Documentary',
    endDate: new Date('2024-11-30'),
    backers: 89,
    verified: true,
    featured: true
  },
  {
    id: '3',
    title: 'Experimental EP',
    artist: 'Digital Dreams',
    description: 'A groundbreaking EP mixing traditional and digital sounds.',
    imageUrl: 'https://picsum.photos/seed/album3/400/300',
    goal: 50,
    raised: 30,
    category: 'EP',
    endDate: new Date('2024-10-15'),
    backers: 45,
    verified: false,
    trending: true
  },
  {
    id: '4',
    title: 'Summer Festival Tour',
    artist: 'Cosmic Waves',
    description: 'Join us on our nationwide summer festival tour.',
    imageUrl: 'https://picsum.photos/seed/tour1/400/300',
    goal: 300,
    raised: 275,
    category: 'Tour',
    endDate: new Date('2024-06-01'),
    backers: 342,
    verified: true,
    trending: true,
    featured: true
  },
  {
    id: '5',
    title: 'Music Video Collection',
    artist: 'Luna & The Stars',
    description: 'A series of interconnected music videos telling a complete story.',
    imageUrl: 'https://picsum.photos/seed/video1/400/300',
    goal: 150,
    raised: 40,
    category: 'Music Video',
    endDate: new Date('2024-09-15'),
    backers: 95,
    verified: true
  },
  {
    id: '6',
    title: 'Vinyl Special Edition',
    artist: 'Retro Beats',
    description: 'Limited edition vinyl release with exclusive artwork and bonus tracks.',
    imageUrl: 'https://picsum.photos/seed/vinyl1/400/300',
    goal: 75,
    raised: 45,
    category: 'Album',
    endDate: new Date('2024-08-30'),
    backers: 120,
    verified: false
  },
  {
    id: '7',
    title: 'Interactive Concert Experience',
    artist: 'Tech Harmony',
    description: 'Revolutionary concert combining live music with AR technology.',
    imageUrl: 'https://picsum.photos/seed/concert1/400/300',
    goal: 500,
    raised: 125,
    category: 'Tour',
    endDate: new Date('2024-11-15'),
    backers: 180,
    verified: true,
    trending: true
  },
  {
    id: '8',
    title: 'Acoustic Sessions',
    artist: 'Mountain Echo',
    description: 'Intimate acoustic recordings in unique natural locations.',
    imageUrl: 'https://picsum.photos/seed/acoustic1/400/300',
    goal: 80,
    raised: 60,
    category: 'EP',
    endDate: new Date('2024-07-20'),
    backers: 145,
    verified: true
  },
  {
    id: '9',
    title: 'Collaboration Album',
    artist: 'Global Fusion Collective',
    description: 'A collaborative album featuring artists from 12 different countries.',
    imageUrl: 'https://picsum.photos/seed/collab1/400/300',
    goal: 250,
    raised: 200,
    category: 'Album',
    endDate: new Date('2024-10-01'),
    backers: 278,
    verified: true,
    featured: true
  }
]

export function useMarket() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    const loadProjects = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate network delay
      setProjects(MOCK_PROJECTS)
      setLoading(false)
    }

    loadProjects()
  }, [])

  return { projects, loading }
}
