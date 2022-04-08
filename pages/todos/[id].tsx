import { Todo } from "../../utils/types"
import { useRouter } from "next/router"
import { useState } from "react"
import { BsPatchCheckFill } from "react-icons/bs"

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
    <div className='container min-h-screen flex flex-col items-center gap-4'>
        <div className="w-full h-80 py-5 pt-py-10 px-5 flex flex-col items-center justify-center gap-5 text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            <h1 className="capitalize">{todo.title}</h1>
            {
                todo.completed? <BsPatchCheckFill fontSize={50} color='green' /> : ''
            }
            <p>{todo.body}</p>
        </div>
        <div className="flex items-center gap-4">
            <button
                onClick={() => {
                router.push("/")
                }}
            >
                Go Back
            </button>
            <button onClick={handleComplete} className="bg-green-500 w-36 text-white rounded-lg p-2 font-semibold hover:scale-110">Complete</button>
            <button onClick={handleDelete} className="bg-red-500 w-36 text-white rounded-lg p-2 font-semibold hover:scale-110">Delete</button>
            
        </div>
      
    </div>
  )
}

export async function getServerSideProps(context: any) {
  const res = await fetch(process.env.API_URL + "/" + context.query.id)
  const todo = await res.json()

  return { props: { todo, url: process.env.API_URL } }
}

export default TodoItem