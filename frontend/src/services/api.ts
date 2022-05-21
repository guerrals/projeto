import axios from "axios";

const url = "localhost:8000";
export const api = axios.create({
    baseURL: `http://${url}/`,
});
