'use client'

import { useWallet } from '@solana/wallet-adapter-react'
import { redirect } from 'next/navigation'
import { WalletButton } from '../solana/solana-provider'

export default function AccountListFeature() {
  const { publicKey } = useWallet()

  if (publicKey) {
    return redirect(`/account/${publicKey.toString()}`)
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-4 py-12">
      <h1 className="text-2xl font-bold">Connect Your Wallet</h1>
      <p className="text-base-content/70">Connect your wallet to view your account details</p>
      <WalletButton />
    </div>
  )
}
