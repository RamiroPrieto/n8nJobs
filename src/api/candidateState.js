import { http } from "./http";

export async function sendCandidateState(payload){
    const res = await http.post("/webhook-test/enviar", payload);
    return res.data
} 