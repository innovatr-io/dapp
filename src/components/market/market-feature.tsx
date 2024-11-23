'use client'
import { MarketUi } from './market-ui'
import { useMarket } from './market-data-access'

export function MarketFeature() {
  const { projects, loading } = useMarket()

  return <MarketUi projects={projects} loading={loading} />
}
