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

        const date = new Date()
        const d = date.getDate()
        const m = date.getMonth() + 1
        const y = date.getFullYear()

        const todo: Todo = {
            title,
            completed: false,
            body,
            date: `${y}-${m <= 9 ? '0' + m : m}-${d <= 9 ? '0' + d : d}`
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
        <div className='container min-h-screen flex flex-col items-center '>
            <div className="w-full h-80 py-5 pt-py-10 px-5 flex flex-col items-center justify-center gap-5 text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            <h1 className="text-2xl font-bold">Create a New Todo</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 items-center w-full">
                <input className="w-full p-2 h-11 rounded-lg text-black sm:w-1/2 focus:outline-none" type="text" placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
                <input className="w-full p-2 h-11 rounded-lg text-black sm:w-1/2 focus:outline-none" type="text" placeholder="What to do" onChange={(e) => setBody(e.target.value)} />
                <button type="submit" disabled={title === '' && body === ''} className='bg-blue-500 w-52 rounded-lg p-2 font-semibold hover:scale-110'>Create todo</button>
            </form>
            </div>
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