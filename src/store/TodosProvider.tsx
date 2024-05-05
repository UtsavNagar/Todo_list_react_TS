import { ReactNode, createContext, useContext, useState } from "react";

export type ToDosProviderProps = {
    children : ReactNode
}

export type ToDo = {
    id: string;
    completed: boolean;
    createdAt: Date;
    task: string;
}

export type TodoContextProps = {
    todos : ToDo[];
    handleAddToDo:(task:string) => void;
    toggleTodoAsCompleted:(id:string) => void;
    handleDeleteTodo:(id:string) => void;
}

export const todoContext = createContext<TodoContextProps | null>(null);

export const ToDosProvider = ({children}: ToDosProviderProps) => {

    const [todos,setTodos] = useState<ToDo[]>(()=>{
        try{
            const newTodos = localStorage.getItem("todos-of-ts+react") || "[]"
            return JSON.parse(newTodos) as ToDo[]
        }catch(e){
            return []
        }
    });

    // Add Todo Task in todos Array of Objects
    const handleAddToDo = (task:string) =>{
        setTodos((prev: ToDo[]) => {
            const newTodo:ToDo[] =[
                {
                    id:Math.random().toString(),
                    completed:false,
                    createdAt:new Date(),
                    task:task,
                },
                ...prev
            ]
            localStorage.setItem("todos-of-ts+react",JSON.stringify(newTodo))
            return newTodo;
        })
    }

    // mark as Completed 
    const toggleTodoAsCompleted = (id:string) =>{
        setTodos((prev: ToDo[]) => {
            const newTodo = prev.map((todo) => {
                if(todo.id === id){
                    return {...todo,completed: !todo.completed};
                }
                return todo
            })
            localStorage.setItem("todos-of-ts+react",JSON.stringify(newTodo))
            return newTodo;
        })
    }

    // remove obect from array todo
    const handleDeleteTodo = (id:string) =>{
        setTodos((prev: ToDo[]) => {
            const newTodo = prev.filter(t => t.id !== id);
            localStorage.setItem("todos-of-ts+react",JSON.stringify(newTodo))
            return newTodo;
        })
    }

    return <todoContext.Provider value={{todos,handleAddToDo,toggleTodoAsCompleted,handleDeleteTodo}}>
        {children}
    </todoContext.Provider>
}

export const useTodo = () => {
    const todosConsumer = useContext(todoContext);
    if(!todosConsumer){
        throw new Error("useTodos used outside of Provider");
    }
    return todosConsumer;
}