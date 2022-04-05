export interface ResponseFuncs {
    GET?: Function
    POST?: Function
    PUT?: Function
    DELETE?: Function
}
  
export interface Todo {
    _id?: number
    title: string
    body: string
    date: string
    completed: boolean
}