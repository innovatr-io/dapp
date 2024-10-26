'use client'

import {getInnovatrProgram, getInnovatrProgramId} from '@project/anchor'
import {useConnection} from '@solana/wallet-adapter-react'
import {Cluster, Keypair, PublicKey} from '@solana/web3.js'
import {useMutation, useQuery} from '@tanstack/react-query'
import {useMemo} from 'react'
import toast from 'react-hot-toast'
import {useCluster} from '../cluster/cluster-data-access'
import {useAnchorProvider} from '../solana/solana-provider'
import {useTransactionToast} from '../ui/ui-layout'

export function useInnovatrProgram() {
  const { connection } = useConnection()
  const { cluster } = useCluster()
  const transactionToast = useTransactionToast()
  const provider = useAnchorProvider()
  const programId = useMemo(() => getInnovatrProgramId(cluster.network as Cluster), [cluster])
  const program = getInnovatrProgram(provider)

  const accounts = useQuery({
    queryKey: ['innovatr', 'all', { cluster }],
    queryFn: () => program.account.innovatr.all(),
  })

  const getProgramAccount = useQuery({
    queryKey: ['get-program-account', { cluster }],
    queryFn: () => connection.getParsedAccountInfo(programId),
  })

  const initialize = useMutation({
    mutationKey: ['innovatr', 'initialize', { cluster }],
    mutationFn: (keypair: Keypair) =>
      program.methods.initialize().accounts({ innovatr: keypair.publicKey }).signers([keypair]).rpc(),
    onSuccess: (signature) => {
      transactionToast(signature)
      return accounts.refetch()
    },
    onError: () => toast.error('Failed to initialize account'),
  })

  return {
    program,
    programId,
    accounts,
    getProgramAccount,
    initialize,
  }
}

export function useInnovatrProgramAccount({ account }: { account: PublicKey }) {
  const { cluster } = useCluster()
  const transactionToast = useTransactionToast()
  const { program, accounts } = useInnovatrProgram()

  const accountQuery = useQuery({
    queryKey: ['innovatr', 'fetch', { cluster, account }],
    queryFn: () => program.account.innovatr.fetch(account),
  })

  const closeMutation = useMutation({
    mutationKey: ['innovatr', 'close', { cluster, account }],
    mutationFn: () => program.methods.close().accounts({ innovatr: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accounts.refetch()
    },
  })

  const decrementMutation = useMutation({
    mutationKey: ['innovatr', 'decrement', { cluster, account }],
    mutationFn: () => program.methods.decrement().accounts({ innovatr: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accountQuery.refetch()
    },
  })

  const incrementMutation = useMutation({
    mutationKey: ['innovatr', 'increment', { cluster, account }],
    mutationFn: () => program.methods.increment().accounts({ innovatr: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accountQuery.refetch()
    },
  })

  const setMutation = useMutation({
    mutationKey: ['innovatr', 'set', { cluster, account }],
    mutationFn: (value: number) => program.methods.set(value).accounts({ innovatr: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accountQuery.refetch()
    },
  })

  return {
    accountQuery,
    closeMutation,
    decrementMutation,
    incrementMutation,
    setMutation,
  }
}
