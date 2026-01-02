import { useQuery } from "@tanstack/react-query";
import { fetchJobs } from "../api/jobs";

export function useJobs(payload) {
    return useQuery({
        queryKey: ["jobs", payload],
        queryFn: () => fetchJobs(payload || {}),
        staleTime: 60_000,
    });
}