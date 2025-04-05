"use client";
import { useEffect, useState } from "react";

/**
 * Loading component that displays a loading spinner and message while content is being loaded.
 * Once the loading state is complete, it renders the child components.
 *
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to render after loading is complete
 *
 * @example
 * ```tsx
 * <Loading>
 *   <App />
 * </Loading>
 * ```
 *
 * @description
 * - Displays a spinner and loading message for 1 second by default.
 * - Uses a timeout to simulate a loading state.
 * - Covers the entire viewport with a fixed overlay during loading.
 */
const Loading = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-primary">
        <div className="animate-spin rounded-full h-l w-l border-b-4 border-tertiary" />
        <p className="ml-4 text-tertiary">Loading portfolio...</p>
      </div>
    );
  }

  return <>{children}</>;
};

export default Loading;
