import axios from "@/lib/axios"
import { API_ROUTES } from "./routes"

async function getCSRF(data = {}) {
  const res = await axios.get(API_ROUTES.GET.CSRF, {
    withCredentials: true
  })
  return res.data
}

const csrfApi = {
  getCSRF
}

export default csrfApi
