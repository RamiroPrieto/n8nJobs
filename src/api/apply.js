import { http } from "./http";

export async function sendApplication(payload){
    const res = await http.post("/webhook-test/send", payload);
    return res.data
} 