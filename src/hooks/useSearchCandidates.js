import { useQuery } from "@tanstack/react-query";
import { searchCandidates } from "../api/search";

export function useSearchCandidates(queryText){
    return useQuery({
        queryKey: ["candidatesSearch", queryText],
        queryFn: () => searchCandidates(queryText),
        enabled: Boolean(queryText && queryText.trim().length >= 2),
        staleTime: 10_000,
    });

}