"use client";

import { useCallback, useEffect, useState } from "react";
import { leaseRecords } from "@/mock/leases.data";
import type { LeaseRecord } from "@/types/lease.types";

/** Local-only lease state for the frontend preview. API calls live in leaseService. */
export function useLeases() {
  const [records, setRecords] = useState<LeaseRecord[]>(leaseRecords);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let active = true;
    const timer = window.setTimeout(() => {
      try {
        if (!active) return;
        setRecords([...leaseRecords]);
        setError(null);
        setIsLoading(false);
      } catch {
        if (!active) return;
        setError("The sample lease records could not be loaded.");
        setIsLoading(false);
      }
    }, 240);
    return () => { active = false; window.clearTimeout(timer); };
  }, [attempt]);

  const deleteLeases = useCallback((ids: string[]) => {
    const idSet = new Set(ids);
    setRecords((current) => current.filter((record) => !idSet.has(record.id)));
  }, []);

  const retry = useCallback(() => {
    setIsLoading(true);
    setError(null);
    setAttempt((current) => current + 1);
  }, []);

  return { records, isLoading, error, deleteLeases, retry };
}
