import { http } from "./http";

export async function sendCandidateState(payload){
    const res = await http.post("/webhook/enviar", payload);
    return res.data
} 