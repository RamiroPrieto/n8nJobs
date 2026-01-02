import { http } from "./http";

export async function fetchJobs(params) {
    
    const res = await http.get("/webhook/jobs", params);

    const body = res.data;
    return Array.isArray(body) ? body : body.date
}