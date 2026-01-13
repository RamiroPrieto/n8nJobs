import { http } from "./http";

export async function fetchJobs(payload) {
    
    const res = await http.get("/webhook-test/jobs", payload, {
        headers: {"Content-Type": "application/json"}
    });

    const body = res.data;
    return Array.isArray(body) ? body : body.date
}