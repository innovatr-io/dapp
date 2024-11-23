'use client'

import { useEffect, useState, useMemo } from 'react'
import { Project } from '@/components/market/market-data-access'
import Image from 'next/image'
import { useMarket } from '@/components/market/market-data-access'

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  const { projects } = useMarket()
  const [project, setProject] = useState<Project | null>(null);
  const [page, setPage] = useState(0);
  const itemsPerPage = 5;

  const totalPages = useMemo(() => {
    if (!project?.investments) return 0;
    return Math.ceil(project.investments.length / itemsPerPage);
  }, [project?.investments]);

  useEffect(() => {
    const foundProject = projects.find(p => p.id === params.id)
    setProject(foundProject || null)
  }, [params.id, projects])

  if (!project) {
    return (
      <div className="text-center my-32">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    )
  }

  const timeLeft = new Date(project.endDate).getTime() - new Date().getTime()
  const daysLeft = Math.ceil(timeLeft / (1000 * 60 * 60 * 24))

  return (
    <div className="max-w-4xl mx-auto">
      <div className="card bg-base-200 shadow-xl">
        <figure className="relative h-96 w-full">
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            className="object-cover"
          />
        </figure>
        <div className="card-body">
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <h1 className="card-title text-3xl flex-1">{project.title}</h1>
            <div className="flex gap-2">
              {project.verified && (
                <div className="badge badge-primary">Verified</div>
              )}
              {project.trending && (
                <div className="badge badge-secondary">Trending</div>
              )}
              <div className="badge badge-outline">{project.category}</div>
            </div>
          </div>

          <div className="text-lg mb-2">by {project.artist}</div>
          
          <p className="text-base-content/70 mb-6">{project.description}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="stats shadow">
              <div className="stat">
                <div className="stat-title">Goal</div>
                <div className="stat-value text-primary">${project.goal.toLocaleString()}</div>
              </div>
              <div className="stat">
                <div className="stat-title">Raised</div>
                <div className="stat-value text-secondary">${project.raised.toLocaleString()}</div>
              </div>
            </div>
            
            <div className="stats shadow">
              <div className="stat">
                <div className="stat-title">Backers</div>
                <div className="stat-value">{project.backers}</div>
              </div>
              <div className="stat">
                <div className="stat-title">Days Left</div>
                <div className="stat-value">{daysLeft}</div>
              </div>
            </div>
          </div>

          <progress
            className="progress progress-primary mb-6"
            value={project.raised}
            max={project.goal}
          ></progress>

          <div className="card-actions justify-end">
            <button className="btn btn-primary">Invest Now</button>
          </div>
        </div>
      </div>

      <div className="mt-8 card bg-base-200">
        <div className="card-body">
          <h2 className="text-2xl font-bold mb-4">Investment History</h2>
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              <thead className="bg-base-300">
                <tr>
                  <th className="font-bold">Investor</th>
                  <th className="font-bold">Amount (USD)</th>
                  <th className="font-bold">Share %</th>
                  <th className="font-bold">Date</th>
                  <th className="font-bold">Status</th>
                </tr>
              </thead>
              <tbody>
                {project.investments?.slice(page * itemsPerPage, (page + 1) * itemsPerPage).map((investment) => (
                  <tr key={investment.id} className="hover:bg-base-300 transition-colors">
                    <td className="font-medium">{investment.investor}</td>
                    <td className="font-medium">${investment.amount.toLocaleString()}</td>
                    <td>{((investment.amount / project.raised) * 100).toFixed(2)}%</td>
                    <td>{new Date(investment.date).toLocaleDateString()}</td>
                    <td>
                      <div className={`badge ${
                        investment.status === 'completed' 
                          ? 'badge-success' 
                          : 'badge-warning'
                      }`}>
                        {investment.status}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {totalPages > 1 && (
            <div className="flex justify-center mt-4">
              <div className="join">
                <button 
                  className="join-item btn btn-sm"
                  onClick={() => setPage(Math.max(0, page - 1))}
                  disabled={page === 0}
                >
                  «
                </button>
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    className={`join-item btn btn-sm ${page === i ? 'btn-active' : ''}`}
                    onClick={() => setPage(i)}
                  >
                    {i + 1}
                  </button>
                ))}
                <button 
                  className="join-item btn btn-sm"
                  onClick={() => setPage(Math.min(totalPages - 1, page + 1))}
                  disabled={page === totalPages - 1}
                >
                  »
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
