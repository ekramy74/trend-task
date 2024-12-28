import {AppState, dispatch, useSelector} from "../store/Store.tsx";
import {changeTaskStatus, deleteTask, setFilter, setTask} from "../store/Tasks/TasksSlice.ts";
import {FaCheckCircle, FaRegCircle} from "react-icons/fa";
import {TaskStatus, TaskType} from "../model/taskTypes.ts";
import {NotFound} from "./not-found/notFound.tsx";

export const Tasks = () => {
    const {filteredTasks, filter} = useSelector((state: AppState) => state.tasks)
    const handleFilterClick = (filter: TaskStatus) => {
        dispatch(setFilter(filter))
    }
    const handleEditClick = (task: TaskType) => {
        dispatch(setTask(task))
    }
    const handleDeleteClick = (id: string) => {
        dispatch(deleteTask(id))
    }
    return (
        <div className={"mt-2 px-20 py-10"}>
            <h2 className={"text-center text-2xl font-semibold"}>Tasks</h2>
            <div className={"tabs flex gap-3 "}>
                <button onClick={() => handleFilterClick("all")}
                        className={`${filter === "all" ? " text-secondary border-b border-secondary" : ""} font-bold px-3 py-2 transition-all duration-300 ease-in-out`}>All
                </button>
                <button onClick={() => handleFilterClick("uncompleted")}
                        className={`${filter === "uncompleted" ? " text-secondary border-b border-secondary" : ""} font-bold  px-3 py-2 transition-all duration-300 ease-in-out`}>Uncompleted
                </button>
                <button onClick={() => handleFilterClick("completed")}
                        className={`${filter === "completed" ? " text-secondary border-b border-secondary" : ""} font-bold  px-3 py-2 transition-all duration-300 ease-in-out`}>Completed
                </button>

            </div>
            <div
                className={`${filteredTasks?.length === 0 ? "flex justify-center items-center" : "grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4"} gap-4 mt-5 select-none`}>
                {filteredTasks?.length === 0 ?
                    <NotFound/>
                    :
                    filteredTasks.map((item, index) => (
                        <div
                            className={"bg-white relative px-5 py-10  rounded-xl shadow-md transition-all ease-in-out duration-300 hover:-translate-y-2"}
                            key={item?.id + index}>
                            <div className={"absolute top-4 right-5 cursor-pointer"}
                                 onClick={() => dispatch(changeTaskStatus(item.id))}>
                                {item.status === "uncompleted" ? <FaRegCircle className={"text-black"} size={20}/> :
                                    <FaCheckCircle className={"text-green-600"} size={20}/>}
                            </div>
                            <h3 className={"text-xl font-normal"}>title: <span
                                className={"font-bold"}>{item.title}</span></h3>
                            <p className={"mt-2"}>description: <span className={"font-bold"}>{item.details}</span></p>
                            <p className={"mt-2"}>status: <span
                                className={`font-bold ${item.status === "uncompleted" ? "text-red-600" : "text-green-600"}`}>{item.status}</span>
                            </p>
                            <div className={"mt-3 flex gap-3"}>
                                <button
                                    onClick={() => handleEditClick(item)}
                                    className={`w-full px-3 py-2 border border-blue-900 bg-blue-900 text-white rounded-md font-bold`}>Edit
                                </button>
                                <button
                                    onClick={() => handleDeleteClick(item?.id)}
                                    className={`w-full px-3 py-2 border border-red-600 text-red-600 rounded-md  font-bold`}>delete
                                </button>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    )
}