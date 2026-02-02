import { useQuery } from "@tanstack/react-query";
import { getCandidates } from "../api/candidates";

export function useCandidates(payload) {
    return useQuery({
        queryKey: ["candidates", payload],
        queryFn: () => getCandidates(payload || {}),
        staleTime: 60_000,
    });
}