export const API_ROUTES = {
  GET: {
    GET_CLIENT: (userId, clientId) => `/user/${userId}/client/${clientId}`,
    GET_CLIENTS: (userId) => `/user/${userId}/client`
  },
  POST: {
    CREATE_CLIENT: (userId) => `/user/${userId}/client`
  },
  PUT: {
    EDIT_CLIENT: (userId, clientId) => `/user/${userId}/client/${clientId}`
  },
  DELETE: {
    DELETE_CLIENT: (userId, clientId) => `/user/${userId}/client/${clientId}`
  }
}
