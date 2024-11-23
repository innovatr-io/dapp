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
    <div className="max-w-4xl mx-auto">
      <AppHero
        title="Artist Verification Program"
        subtitle={
          "Welcome to Innovatr's Artist Verification Program. Get verified to launch your music projects and connect with investors on our platform."
        }
      >
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
      </AppHero>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="card bg-base-200">
          <div className="card-body">
            <h2 className="card-title">Why Get Verified?</h2>
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
            <h2 className="card-title">Verification Process</h2>
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

      <div className="card bg-base-200 mb-12">
        <div className="card-body">
          <h2 className="card-title mb-4">Verification Steps</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center space-y-2">
              <div className="text-4xl font-bold text-primary">1</div>
              <h3 className="font-bold">Submit Info</h3>
              <p className="text-sm">Complete the artist verification form with required details</p>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl font-bold text-primary">2</div>
              <h3 className="font-bold">Verify</h3>
              <p className="text-sm">Our team reviews and verifies your submission</p>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl font-bold text-primary">3</div>
              <h3 className="font-bold">Launch</h3>
              <p className="text-sm">Start creating and managing your music projects</p>
            </div>
          </div>
        </div>
      </div>

      <div className="card bg-base-200 mb-12">
        <div className="card-body">
          <h2 className="card-title mb-4">Start Verification</h2>
          <p className="text-base-content/70 mb-6">
            Ready to join the future of music investment? Start your verification process now.
          </p>
          <InnovatrCreate />
        </div>
      </div>

      <div className="card bg-base-200">
        <div className="card-body">
          <h2 className="card-title mb-4">Your Verification Status</h2>
          <div className="divider"></div>
          <InnovatrList />
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
