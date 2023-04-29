import axios from "axios"

const production = true

export default axios.create({
  baseURL: production
    ? "https://manage-your-clients-backend.herokuapp.com"
    : "http://localhost:5000/api/v1"
})
