"use client";

import { Event } from "../events/page";
import { useQuery } from "@tanstack/react-query";

export const useCalendarEvents = () => {

  const fetchEvents = async (): Promise<Event[]> => {
      const response = await fetch("/api/events");
      const data = await response.json();
      return data;
  };

  const queryConfig = {
    queryKey: ['events'],
    queryFn: fetchEvents,
    retry: 2,
    refetchInterval: 10 * 1000,
  }

  const {data, isLoading, error} = useQuery(queryConfig);


  return { data, isLoading, error };
};
