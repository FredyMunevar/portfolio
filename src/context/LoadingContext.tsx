"use client";
import Loading from "@/presentation/components/Loading/Loading";
import React, { createContext, useContext, useEffect, useState } from "react";

/**
 * Type definition for the LoadingContext.
 */
interface LoadingContextType {
  /** Indicates whether the application is in a loading state */
  isLoading: boolean;
  /** Function to update the loading state */
  setLoading: (state: boolean) => void;
}

/**
 * Context to manage the loading state of the application.
 * Provides a global loading state and a method to update it.
 */
const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

/**
 * LoadingProvider component that wraps the application and provides the loading context.
 * Displays a loading spinner until the application has finished rendering.
 *
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to be wrapped by the provider
 *
 * @example
 * ```tsx
 * <LoadingProvider>
 *   <App />
 * </LoadingProvider>
 * ```
 */
export const LoadingProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasRendered, setHasRendered] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      setHasRendered(true);
    }
  }, [isLoading]);

  return (
    <LoadingContext.Provider value={{ isLoading, setLoading: setIsLoading }}>
      {!hasRendered ? <Loading /> : <>{children}</>}
    </LoadingContext.Provider>
  );
};

/**
 * Custom hook to access the loading context.
 * Throws an error if used outside of a `LoadingProvider`.
 *
 * @returns {LoadingContextType} The loading context value
 *
 * @example
 * ```tsx
 * const { isLoading, setLoading } = useLoading();
 * setLoading(true);
 * ```
 */
export const useLoading = (): LoadingContextType => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};
