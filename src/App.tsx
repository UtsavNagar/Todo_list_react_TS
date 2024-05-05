import "./css/style.css"
import AddToDo from "./Components/AddToDo"
import Navbar from "./Components/Navbar"
import Todos from "./Components/Todos"

const App = () => {
  return (
    <main>
      <h1>TODO REACT + TYPESCRIPT</h1>
      <Navbar/>
      <AddToDo/>
      <Todos/>
    </main>
  )
}

export default App
