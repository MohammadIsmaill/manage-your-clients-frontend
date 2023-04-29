import axios from "@/lib/axios"
import { API_ROUTES } from "./routes"

async function getClient(data = {}) {
  const res = await axios.get(
    API_ROUTES.GET.GET_CLIENT(data.userId, data.clientId)
  )
  return res.data
}

async function getClients(data = {}) {
  const res = await axios.get(API_ROUTES.GET.GET_CLIENTS(data.userId))
  return res.data
}

async function createClient(data = {}) {
  const res = await axios.post(API_ROUTES.POST.CREATE_CLIENT(data.userId), data)
  return res.data
}

async function editClient(data = {}) {
  const res = await axios.put(
    API_ROUTES.PUT.EDIT_CLIENT(data.userId, data.clientId),
    data
  )
  return res.data
}

async function deleteClient(data = {}) {
  const res = await axios.delete(
    API_ROUTES.DELETE.DELETE_CLIENT(data.userId, data.clientId),
    data
  )
  return res.data
}

const clientApi = {
  getClient,
  getClients,
  deleteClient,
  createClient,
  editClient
}

export default clientApi
