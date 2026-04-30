import axios from "axios"

export const axiosInstance = axios.create({
  baseURl: import.meta.env.NODE === "development" ? "http://localhost:3000/api" : "/api",
  withCredentials: true
})