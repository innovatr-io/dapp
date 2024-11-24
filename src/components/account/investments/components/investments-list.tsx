import { UserInvestment } from '../investments-data-access'
import { InvestmentCard } from './investment-card'

interface InvestmentsListProps {
  investments: UserInvestment[]
  isLoading: boolean
}

export function InvestmentsList({ investments, isLoading }: InvestmentsListProps) {
  if (isLoading) {
    return <div>Loading your investments...</div>
  }

  if (!investments.length) {
    return (
      <div className="text-center py-10">
        <h3 className="text-xl font-semibold mb-2">No investments yet</h3>
        <p className="text-muted-foreground">
          Explore the marketplace to find exciting music projects to invest in!
        </p>
      </div>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {investments.map((investment) => (
        <InvestmentCard key={investment.id} investment={investment} />
      ))}
    </div>
  )
}
