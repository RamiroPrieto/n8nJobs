import { http } from "./http";

export async function getCandidates(payload) {
    
    const res = await http.get("/webhook/candidates", payload, {
        headers: {"Content-Type": "application/json"}
    });

    const body = res?.data;

    return Array.isArray(body) ? body : body
}


