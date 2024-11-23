import { useState, useEffect } from "react";

export interface Investment {
 id: string;
 investor: string;
 amount: number; // Amount in USD
 date: Date;
 status: "completed" | "pending";
}

export interface Project {
 id: string;
 title: string;
 artist: string;
 description: string;
 imageUrl: string;
 goal: number;
 raised: number;
 category: string;
 endDate: Date;
 backers: number;
 verified: boolean;
 trending?: boolean;
 featured?: boolean;
 investments: Investment[];
}

const ORIGINAL_PROJECTS = [
 {
  title: "Debut Album - New Horizons",
  artist: "Sarah Blake",
  description: "A fusion of jazz and electronic music pushing boundaries.",
  category: "Album",
  imageUrl: "https://picsum.photos/seed/album1/400/300",
 },
 {
  title: "World Tour Documentary",
  artist: "The Midnight Crew",
  description: "Behind the scenes of our upcoming world tour.",
  category: "Documentary",
  imageUrl: "https://picsum.photos/seed/album2/400/300",
 },
 {
  title: "Experimental EP",
  artist: "Digital Dreams",
  description: "A groundbreaking EP mixing traditional and digital sounds.",
  category: "EP",
  imageUrl: "https://picsum.photos/seed/album3/400/300",
 },
 {
  title: "Summer Festival Tour",
  artist: "Cosmic Waves",
  description: "Join us on our nationwide summer festival tour.",
  category: "Tour",
  imageUrl: "https://picsum.photos/seed/tour1/400/300",
 },
 {
  title: "Music Video Collection",
  artist: "Luna & The Stars",
  description:
   "A series of interconnected music videos telling a complete story.",
  category: "Music Video",
  imageUrl: "https://picsum.photos/seed/video1/400/300",
 },
 {
  title: "Vinyl Special Edition",
  artist: "Retro Beats",
  description:
   "Limited edition vinyl release with exclusive artwork and bonus tracks.",
  category: "Album",
  imageUrl: "https://picsum.photos/seed/vinyl1/400/300",
 },
 {
  title: "Interactive Concert Experience",
  artist: "Tech Harmony",
  description: "Revolutionary concert combining live music with AR technology.",
  category: "Tour",
  imageUrl: "https://picsum.photos/seed/concert1/400/300",
 },
 {
  title: "Acoustic Sessions",
  artist: "Mountain Echo",
  description: "Intimate acoustic recordings in unique natural locations.",
  category: "EP",
  imageUrl: "https://picsum.photos/seed/acoustic1/400/300",
 },
 {
  title: "Collaboration Album",
  artist: "Global Fusion Collective",
  description:
   "A collaborative album featuring artists from 12 different countries.",
  category: "Album",
  imageUrl: "https://picsum.photos/seed/collab1/400/300",
 },
];

function generateRandomInvestments(
 goalAmount: number,
 numInvestments: number = 10
): Investment[] {
 // Ensure we generate at least 10 investments
 numInvestments = Math.max(10, numInvestments);

 const investments: Investment[] = [];
 let remainingAmount = goalAmount * (0.3 + Math.random() * 0.7); // Random raised amount between 30-100% of goal

 // Generate random wallet addresses
 const generateWalletAddress = () => {
  const chars = "0123456789abcdefABCDEF";
  const prefix = Array(4)
   .fill(0)
   .map(() => chars[Math.floor(Math.random() * chars.length)])
   .join("");
  const suffix = Array(4)
   .fill(0)
   .map(() => chars[Math.floor(Math.random() * chars.length)])
   .join("");
  return `${prefix}...${suffix}`;
 };

 // Generate dates within the last 30 days
 const generateDate = () => {
  const now = new Date();
  const daysAgo = Math.floor(Math.random() * 30);
  const date = new Date(now);
  date.setDate(date.getDate() - daysAgo);
  return date;
 };

 // Generate n-1 investments
 for (let i = 0; i < numInvestments - 1; i++) {
  const maxAmount = remainingAmount * 0.5; // No single investment can be more than 50% of remaining
  const amount = Math.max(100, Math.floor(Math.random() * maxAmount));
  remainingAmount -= amount;

  investments.push({
   id: (i + 1).toString(),
   investor: generateWalletAddress(),
   amount,
   date: generateDate(),
   status: Math.random() > 0.1 ? "completed" : "pending", // 10% chance of pending
  });
 }

 // Last investment takes the remaining amount
 investments.push({
  id: numInvestments.toString(),
  investor: generateWalletAddress(),
  amount: Math.max(100, Math.floor(remainingAmount)),
  date: generateDate(),
  status: Math.random() > 0.1 ? "completed" : "pending",
 });

 // Sort by date, most recent first
 return investments.sort((a, b) => b.date.getTime() - a.date.getTime());
}

// Generate goal amount based on category
function generateGoalAmount(category: string): number {
 const baseAmounts: { [key: string]: [number, number] } = {
  Album: [15000, 50000],
  EP: [5000, 15000],
  Tour: [30000, 100000],
  "Music Video": [10000, 25000],
  Documentary: [20000, 60000],
 };

 const [min, max] = baseAmounts[category] || [5000, 50000];
 return Math.floor(min + Math.random() * (max - min));
}

function generateRandomProjects(): Project[] {
 return ORIGINAL_PROJECTS.map((original, index) => {
  const goal = generateGoalAmount(original.category);
  const investments = generateRandomInvestments(goal);
  const raised = investments.reduce((sum, inv) => sum + inv.amount, 0);

  return {
   id: (index + 1).toString(),
   ...original,
   goal,
   raised,
   endDate: new Date(Date.now() + Math.random() * 180 * 24 * 60 * 60 * 1000), // Random date within next 180 days
   backers: investments.length,
   verified: Math.random() > 0.2, // 80% chance of being verified
   trending: Math.random() > 0.7, // 30% chance of trending
   featured: Math.random() > 0.8, // 20% chance of being featured
   investments,
  };
 });
}

// Replace MOCK_PROJECTS with this:
const MOCK_PROJECTS: Project[] = generateRandomProjects();

export function useMarket() {
 const [projects, setProjects] = useState<Project[]>([]);
 const [loading, setLoading] = useState(true);
 const [currentPage, setCurrentPage] = useState(1);
 const projectsPerPage = 9;

 useEffect(() => {
  // Simulate API call
  const loadProjects = async () => {
   await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay
   setProjects(MOCK_PROJECTS);
   setLoading(false);
  };

  loadProjects();
 }, []);

 const indexOfLastProject = currentPage * projectsPerPage;
 const indexOfFirstProject = indexOfLastProject - projectsPerPage;
 const currentProjects = projects.slice(
  indexOfFirstProject,
  indexOfLastProject
 );
 const totalPages = Math.ceil(projects.length / projectsPerPage);

 return {
  projects: currentProjects,
  loading,
  currentPage,
  totalPages,
  setCurrentPage,
  allProjects: projects, // For featured projects
 };
}
