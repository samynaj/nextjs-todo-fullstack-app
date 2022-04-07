import { Todo } from "../../utils/types"
import { useRouter } from "next/router"
import { useState } from "react"

interface TodoItemProps {
  todo: Todo
  url: string
}


function TodoItem(props: TodoItemProps) {

  const router = useRouter()

  const [todo, setTodo] = useState<Todo>(props.todo)

  const handleComplete = async () => {

    if (!todo.completed) {

      const newTodo: Todo = { ...todo, completed: true }
      await fetch(props.url + "/" + todo._id, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTodo),
      })
      setTodo(newTodo)
    }
  }

  const handleDelete = async () => {
    await fetch(props.url + "/" + todo._id, {
      method: "delete",
    })
    router.push("/")
  }

  return (
    <div>
      <h1>{todo.title}</h1>
      <h2>{todo.completed ? "completed" : "incomplete"}</h2>
      <button onClick={handleComplete}>Complete</button>
      <button onClick={handleDelete}>Delete</button>
      <button
        onClick={() => {
          router.push("/")
        }}
      >
        Go Back
      </button>
    </div>
  )
}

export async function getServerSideProps(context: any) {
  const res = await fetch(process.env.API_URL + "/" + context.query.id)
  const todo = await res.json()

  return { props: { todo, url: process.env.API_URL } }
}

export default TodoItem