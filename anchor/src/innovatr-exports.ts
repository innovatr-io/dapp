// Here we export some useful types and functions for interacting with the Anchor program.
import { AnchorProvider, Program } from '@coral-xyz/anchor'
import { Cluster, PublicKey } from '@solana/web3.js'
import InnovatrIDL from '../target/idl/innovatr.json'
import type { Innovatr } from '../target/types/innovatr'

// Re-export the generated IDL and type
export { Innovatr, InnovatrIDL }

// The programId is imported from the program IDL.
export const INNOVATR_PROGRAM_ID = new PublicKey(InnovatrIDL.address)

// This is a helper function to get the Innovatr Anchor program.
export function getInnovatrProgram(provider: AnchorProvider) {
  return new Program(InnovatrIDL as Innovatr, provider)
}

// This is a helper function to get the program ID for the Innovatr program depending on the cluster.
export function getInnovatrProgramId(cluster: Cluster) {
  switch (cluster) {
    case 'devnet':
    case 'testnet':
      // This is the program ID for the Innovatr program on devnet and testnet.
      return new PublicKey('CounNZdmsQmWh7uVngV9FXW2dZ6zAgbJyYsvBpqbykg')
    case 'mainnet-beta':
    default:
      return INNOVATR_PROGRAM_ID
  }
}
