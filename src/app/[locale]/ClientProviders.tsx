"use client";
import { ReactNode, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

/**
 * ClientProviders component that wraps the application with the React Query client provider.
 * This ensures that React Query is available throughout the component tree for managing server state.
 *
 * @component
 * @param {Object} props - Component props
 * @param {ReactNode} props.children - Child components to be wrapped by the provider
 *
 * @example
 * ```tsx
 * <ClientProviders>
 *   <App />
 * </ClientProviders>
 * ```
 */
const ClientProviders = ({ children }: { children: ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient());

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export default ClientProviders;
