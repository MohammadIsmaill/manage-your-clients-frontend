import axios from "@/lib/axios"
import { API_ROUTES } from "./routes"

async function createTask(data = {}) {
  const res = await axios.post(
    API_ROUTES.POST.CREATE_TASK(data.userId, data.clientId),
    data
  )
  return res.data
}

async function getTask(data = {}) {
  const res = await axios.get(
    API_ROUTES.GET.GET_TASK(data.userId, data.clientId, data.taskId),
    data
  )
  return res.data
}

async function getTasks(data = {}) {
  const res = await axios.get(
    API_ROUTES.GET.GET_TASKS(data.userId, data.clientId),
    data
  )
  return res.data
}
async function editTask(data = {}) {
  const res = await axios.put(
    API_ROUTES.PUT.EDIT_TASK(data.userId, data.clientId, data.taskId),
    data
  )
  return res.data
}

async function deleteTask(data = {}) {
  const res = await axios.delete(
    API_ROUTES.DELETE.DELETE_TASK(data.userId, data.clientId, data.taskId)
  )
  return res.data
}

const taskApi = {
  createTask,
  editTask,
  getTask,
  getTasks,
  deleteTask
}

export default taskApi
