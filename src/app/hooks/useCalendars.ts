"use client";

import { useQuery } from "@tanstack/react-query";

export function useCalendars() {
  const {
    data: calendars,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["calendars"],
    queryFn: async () => {
      const res = await fetch("/api/calendars");
      return res.json();
    },
  });

  return { calendars, isLoading, error };
}
