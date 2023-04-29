import { toast } from "react-toastify"

const success = (message) => {
  toast.success(message, { position: toast.POSITION.TOP_RIGHT })
}

const error = (message) => {
  toast.error(message, { position: toast.POSITION.TOP_RIGHT })
}

const notify = {
  success,
  error
}

export default notify
