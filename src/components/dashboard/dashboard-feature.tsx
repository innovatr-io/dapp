'use client'

import { AppHero } from '../ui/ui-layout'

export default function DashboardFeature() {
  return (
    <div className="max-w-4xl mx-auto">
      <AppHero 
        title="Welcome to Innovatr" 
        subtitle="Connect with artists, invest in music projects, and be part of the future of music financing."
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="card bg-base-200">
          <div className="card-body">
            <h2 className="card-title">For Investors</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Browse and invest in music projects</li>
              <li>Choose between DIY or managed investment approaches</li>
              <li>Track your investments in real-time</li>
              <li>Earn returns from project success</li>
              <li>Trade shares in the marketplace</li>
            </ul>
          </div>
        </div>

        <div className="card bg-base-200">
          <div className="card-body">
            <h2 className="card-title">For Artists</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Create and submit funding projects</li>
              <li>Track project progress</li>
              <li>Engage with investors</li>
              <li>Automated revenue distribution</li>
              <li>Professional project management tools</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="card bg-base-200 mb-12">
        <div className="card-body">
          <h2 className="card-title mb-4">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center space-y-2">
              <div className="text-4xl font-bold text-primary">1</div>
              <h3 className="font-bold">Choose Projects</h3>
              <p className="text-sm">Browse verified music projects and select ones that interest you</p>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl font-bold text-primary">2</div>
              <h3 className="font-bold">Invest</h3>
              <p className="text-sm">Use your preferred currency and investment approach</p>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl font-bold text-primary">3</div>
              <h3 className="font-bold">Earn Returns</h3>
              <p className="text-sm">Receive your share of project revenues automatically</p>
            </div>
          </div>
        </div>
      </div>

      <div className="card bg-base-200">
        <div className="card-body">
          <h2 className="card-title mb-4">Platform Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold mb-2">Security & Trust</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-left">
                <li>Blockchain-backed transparency</li>
                <li>Secure asset management</li>
                <li>Identity verification</li>
                <li>Regulatory compliance</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-2">Support</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Comprehensive help center</li>
                <li>Educational resources</li>
                <li>Dedicated customer support</li>
                <li>Community forums</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
