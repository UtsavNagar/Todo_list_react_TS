import { FormEvent, useState } from "react"
import { useTodo } from "../store/TodosProvider";

const AddToDo = () => {
    const {handleAddToDo} = useTodo();
    const [todoData,setTodoData] = useState("");

    const addTask = (e:FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        handleAddToDo(todoData)
        setTodoData("")
    }
  return (
    <form onSubmit={addTask}>
        <input type="text" value={todoData} 
               onChange={(e) => setTodoData(e.target.value)}
               placeholder="Enter Task"
        />
        <button type="submit">ADD</button>
    </form>
  )
}

export default AddToDo
