import clientApi from "@/api/client"
import taskApi from "@/api/task"
import useAuth from "@/hooks/useAuth"
import notify from "@/lib/toastify"
import { errorMessage } from "@/utils/errorMessage"
import Head from "next/head"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { Accordion, Button, Card, Form, Modal } from "react-bootstrap"

export default function Home() {
  const [showCreateClient, setShowCreateClient] = useState(false)
  const [showCreateTask, setShowCreateTask] = useState(false)
  const { push } = useRouter()

  const handleShowCreateClient = () => setShowCreateClient(true)
  const handleCloseCreateClient = () => setShowCreateClient(false)

  const handleShowCreateTask = () => setShowCreateTask(true)
  const handleCloseCreateTask = () => setShowCreateTask(false)
  const { setAuth, auth } = useAuth()

  const [clients, setClients] = useState([])
  async function getClients() {
    try {
      const data = await clientApi.getClients({ userId: auth._id })
      setClients(data)
    } catch (error) {
      notify.error(errorMessage(error))
    }
  }

  useEffect(() => {
    if (auth?._id) getClients()
  }, [auth])

  const [loadingCreateClient, setLoadingCreateClient] = useState(false)
  const [clientName, setClientName] = useState("")
  async function createClient() {
    try {
      setLoadingCreateClient(true)
      const data = await clientApi.createClient({
        userId: auth?._id,
        name: clientName
      })
      setClients([...clients, data])
    } catch (error) {
      notify.error(errorMessage(error))
    } finally {
      setClientName("")
      handleCloseCreateClient()
      setLoadingCreateClient(false)
    }
  }

  const [taskTitle, setTaskTitle] = useState("")
  const [taskDescription, setTaskDescription] = useState("")
  const [clientId, setClientId] = useState()

  const createTask = async () => {
    try {
      const task = await taskApi.createTask({
        title: taskTitle,
        description: taskDescription,
        clientId,
        userId: auth?._id
      })
      let temp = clients
      for (let client of temp) {
        if (client._id == clientId) {
          client.tasks.push(task)
        }
      }
      setClients([...temp])

      notify.success("Task Created Successfully")
    } catch (error) {
      notify.error(errorMessage(error))
    } finally {
      setTaskTitle("")
      setTaskDescription("")
      handleCloseCreateTask()
    }
  }

  const deleteTask = async (clientId, taskId) => {
    try {
      const task = await taskApi.deleteTask({
        userId: auth._id,
        clientId,
        taskId
      })
      let temp = clients
      for (let client of temp) {
        if (client._id == clientId) {
          client.tasks = client.tasks.filter((el) => {
            return el._id !== taskId
          })
        }
      }
      setClients([...temp])
    } catch (error) {}
  }

  const deleteClient = async (clientId) => {
    try {
      await clientApi.deleteClient({
        userId: auth?._id,
        clientId
      })
      setClients((prevClients) =>
        prevClients.filter((client) => {
          return client._id != clientId
        })
      )
    } catch (error) {
      notify.error(errorMessage(error))
    }
  }
  useEffect(() => {
    if (!auth) {
      push("/login")
    }
  }, [])
  return (
    <>
      <Head>
        <title>Manage Your Clients</title>

        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className='bg-dark' style={{ height: "100%", minHeight: "100vh" }}>
        <div className='container pt-3'>
          <div className='d-flex justify-content-between align-items-center'>
            <button
              onClick={handleShowCreateClient}
              className='btn btn-primary'
            >
              New Client
            </button>
            <button
              className='btn btn-warning'
              onClick={() => {
                localStorage.removeItem("user")
                setAuth()
                push("/login")
              }}
            >
              Logout
            </button>
          </div>

          <div className='row gap-2'>
            {" "}
            {clients.map((client) => {
              return (
                <>
                  <div className='col-12 my-5'>
                    <Card className='bg-primary'>
                      <Card.Header>
                        <div className='d-flex justify-content-between align-items-center'>
                          <div>
                            <h4 className='text-white'>{client.name}</h4>
                          </div>{" "}
                          <div>
                            <button
                              onClick={() => {
                                handleShowCreateTask()
                                setClientId(client._id)
                              }}
                              className='me-2 btn btn-success btn-sm'
                            >
                              New Task
                            </button>
                            <button
                              onClick={() => {
                                if (
                                  confirm(
                                    "Are you sure you want to delete client?"
                                  )
                                )
                                  deleteClient(client._id)
                              }}
                              className=' btn btn-danger btn-sm'
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </Card.Header>

                      {client.tasks.map((task, index) => {
                        return (
                          <Accordion>
                            <Accordion.Item eventKey={index}>
                              <Accordion.Header>
                                <div className='h-100 w-100 d-flex justify-content-between align-item-cente w-100'>
                                  <h5> {task.title}</h5>
                                  <Button
                                    onClick={() => {
                                      if (
                                        confirm(
                                          "Are you sure you want to delete task?"
                                        )
                                      )
                                        deleteTask(client._id, task._id)
                                    }}
                                    variant='danger'
                                    size='sm'
                                    className='ml-1 '
                                    roundedCircle
                                  >
                                    X
                                  </Button>
                                </div>
                              </Accordion.Header>
                              <Accordion.Body>
                                {task.description}
                              </Accordion.Body>
                            </Accordion.Item>
                          </Accordion>
                        )
                      })}
                    </Card>
                  </div>
                </>
              )
            })}
          </div>
        </div>

        <Modal show={showCreateClient} onHide={handleCloseCreateClient}>
          <div className='bg-dark p-3' closeButton>
            <Modal.Title className='text-primary'>Client</Modal.Title>
          </div>
          <div className='bg-dark p-3'>
            <Form.Group className='mb-3' controlId='formBasicEmail'>
              <Form.Control
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                type='text'
                placeholder='Name'
                required
              />
            </Form.Group>
          </div>
          <div className='bg-dark p-3'>
            <Button variant='secondary' onClick={handleCloseCreateClient}>
              Close
            </Button>
            <Button
              variant='primary'
              className='ms-2'
              onClick={() => createClient()}
            >
              Create
            </Button>
          </div>
        </Modal>
        <Modal show={showCreateTask} onHide={handleCloseCreateTask}>
          <div className='bg-dark p-2' closeButton>
            <Modal.Title className='text-primary'>Task</Modal.Title>
          </div>
          <div className='bg-dark p-2'>
            <Form.Group className='mb-3' controlId='formBasicEmail'>
              <Form.Control
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                type='text'
                placeholder='Title'
                required
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='formBasicEmail'>
              <Form.Control
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
                type='text'
                placeholder='Description'
                required
              />
            </Form.Group>
          </div>
          <div className='bg-dark p-2'>
            <Button variant='secondary' onClick={handleCloseCreateTask}>
              Close
            </Button>
            <Button
              className='ms-2'
              variant='primary'
              onClick={() => createTask()}
            >
              Create Task
            </Button>
          </div>
        </Modal>
      </div>
    </>
  )
}
