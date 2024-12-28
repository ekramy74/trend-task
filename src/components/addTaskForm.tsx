import {useForm} from "react-hook-form";
import {TaskType} from "../model/taskTypes.ts";
import {AppState, dispatch, useSelector} from "../store/Store.tsx";
import {setTask, setTasks} from "../store/Tasks/TasksSlice.ts";
import {useEffect} from "react";


export const AddTaskForm = () => {
    const {
        register,
        handleSubmit,
        formState: {errors},
        reset,
        setValue,
        clearErrors
    } = useForm<TaskType>();
    const {task, tasks} = useSelector((state: AppState) => state.tasks)
    useEffect(() => {
        if (task) {
            setValue("id", task.id)
            setValue("title", task.title)
            setValue("details", task.details)
            setValue("status", task.status)
        }
    }, [task]);

    const handleAddTask = (data: TaskType) => {
        const task = {
            id: Math.random().toString(36).substring(2, 9),
            title: data.title,
            details: data.details,
            status: "uncompleted"
        }
        const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
        tasks.push(task);
        dispatch(setTasks(tasks));
        reset()
    }

    const handleEdit = (data: TaskType) => {
        const newTask: TaskType = {
            id: task?.id || Math.random().toString(36).substring(2, 9),
            title: data.title,
            details: data.details,
            status: task?.status || "uncompleted"
        }
        const updatedTasks = tasks.map((item) =>
            item.id === task?.id ? newTask : item
        );
        console.log("edit", updatedTasks);
        dispatch(setTasks(updatedTasks));
        dispatch(setTask(null));
        reset()
    }

    return (
        <form onSubmit={handleSubmit(task ? handleEdit : handleAddTask)}>
            <div className="text-start">
                <label htmlFor="title" className="font-semibold text-white">Task title</label>
                <input
                    id="title"
                    type="text"
                    {...register("title", {required: "task title is required"})}
                    className={`form-input ps-11 w-full my-2 py-2 px-3 h-10 bg-transparent bg-white rounded outline-none border ${
                        errors.title ? "border-red-500 focus:border-red-500" : "border-gray-200 focus:border-secondary "
                    } focus:ring-0`}
                    placeholder={"Enter your task title"}
                />
                {errors.title && <span className="text-red-600">{errors.title.message}</span>}
            </div>
            <div className="text-start">
                <label htmlFor="details" className="font-semibold text-white">Task description</label>
                <textarea
                    id="details"
                    {...register("details", {required: "Task details is required"})}
                    className={`form-input ps-11 w-full my-2 py-2 px-3 h-28 bg-transparent bg-white rounded outline-none border ${
                        errors.details ? "border-red-500 focus:border-red-500" : "border-gray-200 focus:border-secondary "
                    } focus:ring-0`}
                    placeholder={"Enter your task details"}
                ></textarea>

            </div>
            <div className={"flex gap-4"}>
                <button
                    type="submit"
                    id="submit"
                    name="send"
                    className={"py-2 px-5 font-semibold tracking-wide border align-middle duration-500 text-base text-center bg-secondary hover:bg-secondary-hover border-secondary hover:border-secondary-hover text-white rounded-md justify-center flex items-center w-full"}
                >
                    {task ? "Edit task" : "Add task"}
                </button>
                {task && <button
                    name="cancel"
                    onClick={() => {
                        reset()
                        dispatch(setTask(null))
                        clearErrors()
                    }}
                    className={"py-2 px-5 font-semibold tracking-wide border align-middle duration-500 text-base text-center hover:bg-secondary  border-secondary hover:border-secondary-hover text-secondary hover:text-white rounded-md justify-center flex items-center w-full"}
                >
                    Cancel
                </button>}
            </div>

        </form>
    );
};
