import { UserInvestment } from '../investments-data-access'
import Image from 'next/image'
import { formatDistanceToNow } from 'date-fns'

interface InvestmentCardProps {
  investment: UserInvestment
}

export function InvestmentCard({ investment }: InvestmentCardProps) {
  return (
    <div className="card bg-base-200 shadow-xl w-full h-full flex flex-col">
      <figure className="px-4 pt-4 relative h-52 flex-shrink-0">
        <Image
          src={investment.imageUrl}
          alt={investment.title}
          fill
          className="rounded-xl object-cover"
        />
        <div className="absolute top-6 right-6 badge badge-primary">
          {investment.status}
        </div>
      </figure>
      
      <div className="card-body flex flex-col justify-between flex-grow">
        <div className="flex flex-col h-full">
          <div className="space-y-2">
            <h2 className="card-title text-lg line-clamp-1">{investment.title}</h2>
            <div className="flex items-center gap-2 flex-wrap">
              <p className="text-sm text-base-content/70">by {investment.artist}</p>
            </div>
          </div>
          
          <div className="mt-auto">
            <div className="flex justify-between items-center text-sm mt-2">
              <span>Goal: ${investment.goal.toLocaleString()}</span>
              <span>Raised: ${investment.totalRaised.toLocaleString()}</span>
            </div>
            <progress
              className={`progress ${investment.totalRaised >= investment.goal ? 'progress-success' : 'progress-primary'}`}
              value={investment.totalRaised}
              max={investment.goal}
            ></progress>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <p className="text-sm text-base-content/70">Your Investment</p>
              <p className="font-medium">${investment.invested.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-base-content/70">Return Rate</p>
              <p className="font-medium">{investment.returnRate}%</p>
            </div>
          </div>

          {investment.status === 'funded' && investment.claimableReturns > 0 && (
            <div className="bg-success/20 p-3 rounded-lg mt-4">
              <p className="text-sm font-medium text-success">
                Claimable Returns: ${investment.claimableReturns.toLocaleString()}
              </p>
              <button className="btn btn-success btn-sm w-full mt-2">
                Claim Returns
              </button>
            </div>
          )}

          <div className="flex justify-between items-center text-sm mt-4">
            <span>Status: {investment.status}</span>
            <span>{formatDistanceToNow(investment.endDate, { addSuffix: false })} left</span>
          </div>
        </div>
      </div>
    </div>
  )
}
