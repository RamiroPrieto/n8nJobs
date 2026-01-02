import { useMutation } from "@tanstack/react-query";
import { sendApplication } from "../api/apply";

export function useSendApplication(){
    return useMutation({
        mutationFn: sendApplication,
    })
}