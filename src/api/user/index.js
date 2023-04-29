import axios from "@/lib/axios"
import { API_ROUTES } from "./routes"

async function registerUser(data = {}) {
  const res = await axios.post(API_ROUTES.POST.REGISTER, data)
  if (res.data) {
    localStorage.setItem("user", JSON.stringify(res.data))
  }
  return data
}

async function loginUser(data = {}) {
  const res = await axios.post(API_ROUTES.POST.LOGIN, data)
  if (res.data) {
    localStorage.setItem("user", JSON.stringify(res.data))
  }
  return res.data
}

const userApi = {
  registerUser,
  loginUser
}

export default userApi
