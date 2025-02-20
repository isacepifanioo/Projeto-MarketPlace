import axios from "axios";

export const InstacieAxios = axios.create({
    baseURL: "http://localhost:3000"
})