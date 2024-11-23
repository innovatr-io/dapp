import { useState, useEffect } from 'react'

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
    featured: true
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
