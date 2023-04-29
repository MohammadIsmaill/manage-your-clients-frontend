import "@/styles/globals.css"
import "@/styles/bootstrap.css"
import "react-toastify/dist/ReactToastify.css"
import { AuthProvider } from "@/context/AuthContext"
import { ToastContainer } from "react-toastify"

export default function App({ Component, pageProps }) {
  return (
    <>
      <AuthProvider>
        <ToastContainer />
        <Component {...pageProps} />
      </AuthProvider>
    </>
  )
}
