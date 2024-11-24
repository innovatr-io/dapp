"use client";

import { useQuery } from "@tanstack/react-query";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { mockInvestments } from "./investments-data-access";
import { InvestmentsList } from "./components/investments-list";

export function InvestmentsFeature() {
 const { connection } = useConnection();
 const { publicKey } = useWallet();

 const { data: investments = [], isLoading } = useQuery({
  queryKey: ["user-investments", publicKey?.toBase58()],
  queryFn: async () => {
   if (!publicKey) return [];

   // TODO: Replace with actual blockchain data fetching
   return mockInvestments;
  },
  enabled: !!publicKey,
 });

 return (
  <div className="container py-8">
   <div className="mb-8">
    <h1 className="text-3xl font-bold tracking-tight">Your Investments</h1>
    <p className="text-muted-foreground mt-2">
     Track your music investments and returns
    </p>
   </div>

   <InvestmentsList investments={investments} isLoading={isLoading} />
  </div>
 );
}
