import axios from "axios";

export const http = axios.create({
    // baseURL: "https://concentrix.net.ar:8443",
    baseURL: "",
    timeout: 15000,
    headers: {"Content-Type": "application/json" },
});