import './index.css'
import {AddTaskForm} from "./components/addTaskForm.tsx";
import {Tasks} from "./components/task.tsx";

function App() {

    return (
        <>
            <div className="px-20 w-full bg-main py-10">
                <AddTaskForm/>
            </div>
            <Tasks/>
        </>
    )
}

export default App
