import { useRouter } from "next/router"
import { FormEventHandler, useState } from "react"
import { Todo } from "../../utils/types"


interface CreateProps {
  url: string
}


function Create(props: CreateProps) {

    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')

    const router = useRouter()

    

    const handleSubmit: FormEventHandler<HTMLFormElement> = async event => {
        event.preventDefault()

        const d = new Date()

        const todo: Todo = {
            title,
            completed: false,
            body,
            date: `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`
        }

        await fetch(props.url, {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(todo),
        })

        router.push("/")
    }

    return (
        <div>
        <h1>Create a New Todo</h1>
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
            <input type="text" placeholder="What to do" onChange={(e) => setBody(e.target.value)} />
            <button type="submit">Create todo</button>
        </form>
        </div>
    )
}

export async function getStaticProps(context: any) {
  return {
    props: {
      url: process.env.API_URL,
    },
  }
}

export default Create