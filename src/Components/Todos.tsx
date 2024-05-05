import { useSearchParams } from 'react-router-dom';
import { useTodo } from '../store/TodosProvider'

const Todos = () => {
    const {todos,toggleTodoAsCompleted,handleDeleteTodo} = useTodo();
    const [searchParams] = useSearchParams();
    let todosData = searchParams.get("todos");
    let filteredData = todos;

    if(todosData=="active"){
        filteredData = filteredData.filter(t=>!t.completed);
    }else if(todosData=="completed"){
        filteredData = filteredData.filter(t=>t.completed);
    }

    return (
    <ul className='tasksArea'>
      {filteredData.map((todo,index) =><li key={index}>
        <input type='checkbox' 
               id={`todo-${todo.id}`} 
               checked={todo.completed}
               onChange={() => toggleTodoAsCompleted(todo.id)}
        />
        <label htmlFor={`todo-${todo.id}`}>{todo.task}</label>

        {
            todo.completed && (
                <button type='button' onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
            )
        }
      </li>)}
    </ul>
  )
} 

export default Todos
