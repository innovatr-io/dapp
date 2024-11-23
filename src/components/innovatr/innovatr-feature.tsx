'use client'

import { useWallet } from '@solana/wallet-adapter-react'
import { WalletButton } from '../solana/solana-provider'
import { AppHero, ellipsify } from '../ui/ui-layout'
import { ExplorerLink } from '../cluster/cluster-ui'
import { useInnovatrProgram } from './innovatr-data-access'
import { InnovatrCreate, InnovatrList } from './innovatr-ui'

export default function InnovatrFeature() {
  const { publicKey } = useWallet()
  const { programId } = useInnovatrProgram()

  return publicKey ? (
    <div className="max-w-4xl mx-auto px-4">
      <AppHero
        title="Artist Verification Program"
        subtitle={
          "Welcome to Innovatr's Artist Verification Program. Get verified to launch your music projects and connect with investors on our platform."
        }
      >
        <div className="flex flex-col items-center gap-6 mt-8">
          <div className="stats shadow">
            <div className="stat">
              <div className="stat-title">Your Wallet</div>
              <div className="stat-value text-primary text-sm">
                <ExplorerLink path={`account/${publicKey}`} label={ellipsify(publicKey.toString())} />
              </div>
            </div>
            <div className="stat">
              <div className="stat-title">Program ID</div>
              <div className="stat-value text-secondary text-sm">
                <ExplorerLink path={`account/${programId}`} label={ellipsify(programId.toString())} />
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
            <div className="card bg-base-200">
              <div className="card-body">
                <h3 className="card-title">Why Get Verified?</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Launch fundraising projects on Innovatr</li>
                  <li>Build trust with potential investors</li>
                  <li>Access to platform analytics and insights</li>
                  <li>Automated revenue distribution to investors</li>
                  <li>Priority support and project promotion</li>
                </ul>
              </div>
            </div>
            
            <div className="card bg-base-200">
              <div className="card-body">
                <h3 className="card-title">Verification Process</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Submit artist/band information</li>
                  <li>Provide proof of identity</li>
                  <li>Link existing music profiles</li>
                  <li>Complete blockchain basics training</li>
                  <li>Set up secure payment distribution</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="card bg-base-200 w-full">
            <div className="card-body">
              <h3 className="card-title">Start Verification</h3>
              <p className="text-base-content/70 mb-4">
                Ready to join the future of music investment? Start your verification process now.
              </p>
              <InnovatrCreate />
            </div>
          </div>
        </div>
      </AppHero>
      
      <div className="mt-12">
        <div className="card bg-base-200 p-6">
          <div className="card-body">
            <h2 className="card-title">Your Verification Status</h2>
            <div className="divider"></div>
            <InnovatrList />
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="max-w-4xl mx-auto">
      <AppHero
        title="Connect Your Wallet"
        subtitle="Connect your wallet to start the artist verification process and join the Innovatr platform."
      >
        <div className="flex flex-col items-center gap-4">
          <WalletButton />
          <p className="text-sm text-base-content/70">
            New to crypto? Don&apos;t worry - we&apos;ll guide you through every step of the process.
          </p>
        </div>
      </AppHero>
    </div>
  )
}
