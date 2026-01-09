import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendCandidateState } from "../api/candidateState";

export function useCandidateState(){
    const qc = useQueryClient();

    return useMutation({
        mutationFn: sendCandidateState,
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["sendCandidateState"]})
        }
    })
}