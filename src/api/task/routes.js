export const API_ROUTES = {
  GET: {
    GET_TASK: (userId, clientId, taskId) =>
      `/user/${userId}/client/${clientId}/task/${taskId}`,
    GET_TASKS: (userId, clientId) => `/user/${userId}/client/${clientId}/task`
  },
  POST: {
    CREATE_TASK: (userId, clientId) => `/user/${userId}/client/${clientId}/task`
  },
  PUT: {
    EDIT_TASK: (userId, clientId) =>
      `/user/${userId}/client/${clientId}/task/${taskId}`
  },
  DELETE: {
    DELETE_TASK: (userId, clientId, taskId) =>
      `/user/${userId}/client/${clientId}/task/${taskId}`
  }
}
