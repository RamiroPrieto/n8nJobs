import { http } from "./http";

export async function searchCandidates(queryText){
    const payload = { prompt: queryText }
    const res = await http.post("/webhook-test/search", payload);

    return res.data
}