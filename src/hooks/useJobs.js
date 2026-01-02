import { useQuery } from "@tanstack/react-query";
import { fetchJobs } from "../api/jons";

export function useJobs(payload) {
    return useQuery({
        queryKey: ["jobs", payload],
        queryFn: () => fetchJobs(payload || {}),
        staleTime: 60_000,
    });
}