import { useState, useCallback } from "react";
import axios from "axios";
import { months } from "@/components/utils/constants";

type StatsResponse = {
  ndvi: Record<string, number>;
  lst: Record<string, number>;
};

export const useWardStats = () => {
  const [stats, setStats] = useState<StatsResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = useCallback(async (year: number, monthIndex: number) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await axios.post('http://139.84.241.215/api/ndvi/', {
        year,
        month: months[monthIndex],
      });

      // Log the full response for debugging
      console.log("Full API response:", res.data);

      // Use res.data directly if API returns { ndvi: ..., lst: ... }
      setStats(res.data.stats);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to fetch stats");
      }
    }
    setIsLoading(false);
  }, []);

  return { stats, isLoading, error, fetchStats };
};

