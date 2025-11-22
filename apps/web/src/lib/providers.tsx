"use client";

import { SuiClientProvider, WalletProvider } from "@mysten/dapp-kit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { networkConfig } from "./networkConfig";
import { useState, ReactNode } from "react";
import { NotificationProvider } from "./NotificationContext";

export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <SuiClientProvider networks={networkConfig} defaultNetwork="testnet">
        <WalletProvider autoConnect>
          <NotificationProvider>
            {children}
          </NotificationProvider>
        </WalletProvider>
      </SuiClientProvider>
    </QueryClientProvider>
  );
}
