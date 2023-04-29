import userApi from "@/api/user"
import useAuth from "@/hooks/useAuth"
import notify from "@/lib/toastify"
import { errorMessage } from "@/utils/errorMessage"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { Button, Form } from "react-bootstrap"

export default function Register() {
  const [loading, setLoading] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const { push } = useRouter()

  const { auth, setAuth } = useAuth()
  async function registerUser() {
    try {
      setLoading(true)
      const data = await userApi.registerUser({ username, password })
      setAuth(data)
    } catch (error) {
      notify.error(errorMessage(error))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (auth) push("/")
  }, [auth])
  return (
    <div className='bg-dark'>
      <div className='container   '>
        <div className='w-100 ' style={{ height: "100vh" }}>
          <div className='h-100 d-flex justify-content-center align-items-center'>
            <div>
              <h1 className='text-white display-5'>Manage Your Clients</h1>
              <Form.Group className='mb-3' controlId='formBasicEmail'>
                <Form.Control
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  type='text'
                  placeholder='Username'
                />
              </Form.Group>

              <Form.Group className='mb-3' controlId='formBasicPassword'>
                <Form.Control
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type='password'
                  placeholder='Password'
                />
              </Form.Group>

              <Button
                onClick={() => registerUser()}
                variant='primary'
                className='w-100'
                type='submit'
              >
                Register
              </Button>
              <a href='/login' className='link link-primary'>
                Login
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
